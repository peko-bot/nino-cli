const babel = require('@babel/core');
const path = require('path');
const fs = require('fs-extra');
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
  try {
    for (let file of files) {
      const outputPath = file.replace(entry, output);
      if (file.includes('.css')) {
        fs.copySync(file, outputPath);
      } else {
        const fileContent = fs.readFileSync(file, 'utf8');
        const result = babel.transformSync(fileContent, babelConfig);
        fs.outputFileSync(outputPath, result.code);
      }
    }
  } catch (error) {
    throw Error('compile error: ' + error);
  }
};
