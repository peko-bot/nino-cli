const babel = require('@babel/core');
const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
const chalk = require('chalk');
const { getProjectPath, injectRequire } = require('../babel/projectHelper');
injectRequire();
const babelConfig = require('../babel/babelCommonConfig')();

const walk = dir => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

function runCmd(cmd, args, callback) {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', code => {
    if (code !== 0) {
      process.exit(code);
    }
    callback && callback(code);
  });
}

const compileJSX = (files, entry, output) => {
  for (let file of files) {
    let outputPath = file.replace(entry, output).replace('jsx', 'js');
    if (file.endsWith('js') || file.endsWith('jsx')) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const result = babel.transformSync(fileContent, babelConfig);
      fs.outputFileSync(outputPath, result.code);
    } else if (!(file.endsWith('jsx') || file.endsWith('js'))) {
      fs.copySync(file, outputPath);
    }
  }
};

const getNewFiles = entryPath =>
  walk(entryPath).filter(
    f =>
      f.indexOf('test') < 0 &&
      f.indexOf('html') < 0 &&
      f.indexOf('demo') < 0 &&
      f.indexOf('mock') < 0 &&
      !(f.endsWith('ts') || f.endsWith('tsx')),
  );

// if only tsx, compile them to jsx with tsc
// then compile them to es5 with babel
// for using babel plugins like babel-import
exports.compile = program => {
  const entry = program.entry || 'src';
  const output = program.output || 'lib';
  const entryPath = path.join(getProjectPath(), program.entry || 'src');
  const files = walk(entryPath).filter(
    f =>
      f.indexOf('test') < 0 &&
      f.indexOf('html') < 0 &&
      f.indexOf('demo') < 0 &&
      f.indexOf('mock') < 0,
  );
  const tsxFiles = files.filter(f => f.endsWith('ts') || f.endsWith('tsx'));
  const jsxFiles = files.filter(f => f.endsWith('js') || f.endsWith('jsx'));
  let isTsx = false;
  if (tsxFiles.length > 0 && jsxFiles.length === 0) {
    isTsx = true;
  }
  // compile
  if (isTsx) {
    const tscBin = require.resolve('typescript/bin/tsc');
    // support args
    const additionalArgs = process.argv.slice(3);
    let args = [tscBin];
    args.concat(additionalArgs).join(' ');
    runCmd('node', args, () => {
      compileJSX(getNewFiles(entryPath), entry, output);
    });
  } else {
    compileJSX(getNewFiles(entryPath), entry, output);
  }
};
