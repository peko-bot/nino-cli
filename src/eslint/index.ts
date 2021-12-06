import fs from 'fs-extra';
import { runCmd, joinWithRootPath } from '../utils/common';
import path from 'path';

export const eslint = (program: any) => {
  const { lintConfigPath, ignoreConfigPath, checkPaths } = program;
  const eslintBin = require.resolve('eslint');
  let eslintConfig = path.join(__dirname, '../../.eslintrc.js');
  let eslintIgnore = path.join(__dirname, '../../.eslintignore');
  const projectEslint = lintConfigPath && joinWithRootPath(lintConfigPath);
  if (fs.existsSync(projectEslint)) {
    eslintConfig = projectEslint;
  }
  const args = [eslintBin, checkPaths, '--config', eslintConfig];
  if (fs.existsSync(ignoreConfigPath)) {
    eslintIgnore = ignoreConfigPath;
  }
  args.push('--ignore-path', eslintIgnore);
  runCmd('node', args);
};
