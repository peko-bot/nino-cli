import path from 'path';
import fs from 'fs-extra';
import { runCmd } from '../utils/runCommand';

exports.eslint = (program: any) => {
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
