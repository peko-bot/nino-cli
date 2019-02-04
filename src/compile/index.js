const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
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
  const entry = path.join(getProjectPath(), program.entry || 'src');
  // const output = path.join(getProjectPath(), program.output || 'lib');
  const files = walk(entry).filter(
    f =>
      f.indexOf('test') < 0 &&
      f.indexOf('css') < 0 &&
      f.indexOf('html') < 0 &&
      f.indexOf('demo') < 0 &&
      f.indexOf('mock') < 0,
  );
  try {
    for (let file of files) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const result = babel.transformSync(fileContent, babelConfig);
      fse.outputFileSync(file.replace('src', 'lib'), result.code);
    }
  } catch (error) {
    throw Error('compile error: ' + error);
  }
};
