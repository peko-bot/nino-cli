const babel = require('@babel/core');
const path = require('path');
const fs = require('fs-extra');
const { getProjectPath, injectRequire } = require('../babel/projectHelper');
const { runCmd } = require('../utils/runCommand');
injectRequire();
const babelConfig = require('../babel/babelCommonConfig');
const chalk = require('chalk');

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

const compileJSX = (files, entry, output, outputEs) => {
  for (let file of files) {
    let outputPath = file.replace(entry, output).replace('jsx', 'js');
    let outputEsPath = file.replace(entry, outputEs).replace('jsx', 'js');
    if (file.endsWith('js') || file.endsWith('jsx')) {
      const fileContent = fs.readFileSync(file, 'utf8');
      let result = babel.transformSync(fileContent, babelConfig());
      fs.outputFileSync(outputPath, result.code);
      result = babel.transformSync(fileContent, babelConfig(true));
      fs.outputFileSync(outputEsPath, result.code);
    } else if (!(file.endsWith('jsx') || file.endsWith('js'))) {
      fs.copySync(file, outputPath);
      fs.copySync(file, outputEsPath);
    }
  }
  // eslint-disable-next-line
  console.log(chalk.green(`少女换上了新的钱箱，开始了一年新的单身生活`));
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
  const outputEs = program.outputEs || 'es';

  if (fs.existsSync(path.join(process.cwd(), output))) {
    fs.emptyDirSync(path.join(process.cwd(), output));
  }
  if (fs.existsSync(path.join(process.cwd(), outputEs))) {
    fs.emptyDirSync(path.join(process.cwd(), outputEs));
  }
  // eslint-disable-next-line
  console.log(
    chalk.cyanBright(
      `少女边清理名为 ${output} 的钱箱，边回顾着即将结束的一年单身生活

...顺带感慨了下自己一平如洗的身板
      `,
    ),
  );

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
      compileJSX(getNewFiles(entryPath), entry, output, outputEs);
    });
  } else {
    compileJSX(getNewFiles(entryPath), entry, output, outputEs);
  }
};
