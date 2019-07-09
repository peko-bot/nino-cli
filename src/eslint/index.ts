import fs from 'fs-extra';
import { runCmd } from '../utils/runCommand';
import { getProjectPath } from '../babel/projectHelper';

export const eslint = (program: any) => {
  const isFix = program.fix;
  const configPath = program.config;
  const ignorePath = program.ignore;
  const eslintBin = require.resolve('eslint/bin/eslint');
  let eslintConfig = getProjectPath('.eslintrc.js');
  let eslintIgnore = getProjectPath('.eslintignore');
  const projectEslint = configPath && getProjectPath(configPath);
  if (fs.existsSync(projectEslint)) {
    eslintConfig = projectEslint;
  }
  const args = [eslintBin, '.', '--config', eslintConfig];
  if (fs.existsSync(ignorePath)) {
    eslintIgnore = ignorePath;
  }
  args.push('--ignore-path', eslintIgnore);
  if (isFix) {
    args.push('--fix');
  }
  runCmd('node', args);
};
