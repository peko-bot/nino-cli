const babel = require('@babel/core');
const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
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
  for (let file of files) {
    let outputPath = file.replace(entry, output);
    if (outputPath.endsWith('jsx') || outputPath.endsWith('js')) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const result = babel.transformSync(fileContent, babelConfig);
      fs.outputFileSync(outputPath, result.code);
    } else if (outputPath.endsWith('tsx') || outputPath.endsWith('ts')) {
      const tscBin = require.resolve('typescript/bin/tsc');
      // support args
      const additionalArgs = process.argv.slice(3);
      let args = [tscBin];
      args.concat(additionalArgs).join(' ');
      runCmd('node', args);
    } else {
      fs.copySync(file, outputPath);
    }
  }
};
