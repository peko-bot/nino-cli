const path = require('path');
const fs = require('fs-extra');
const { runCmd } = require('../utils/runCommand');

exports.eslint = program => {
  const isFix = program.fix;
  const configPath = program.config;
  const ignorePath = program.ignore;
  const eslintBin = require.resolve('eslint/bin/eslint');
  let eslintConfig = path.join(__dirname, '../../.eslintrc.js');
  let eslintIgnore = path.join(__dirname, '../../.eslintignore');
  const projectEslint = configPath && path.join(process.cwd(), configPath);
  if (fs.existsSync(projectEslint)) {
    eslintConfig = projectEslint;
  }
  let args = [eslintBin, '.', '--config', eslintConfig];
  if (fs.existsSync(ignorePath)) {
    eslintIgnore = ignorePath;
  }
  args.push('--ignore-path', eslintIgnore);
  if (isFix) {
    args.push('--fix');
  }
  runCmd('node', args);
};
