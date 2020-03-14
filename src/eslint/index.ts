import fs from 'fs-extra';
import { runCmd, joinWithRootPath } from '../utils/common';
import path from 'path';
import getRemainingArgs from 'commander-remaining-args';

export const eslint = (program: any) => {
  const { lintConfigPath, ignoreConfigPath, checkPaths } = program;
  const eslintBin = require.resolve('eslint/bin/eslint');
  let eslintConfig = path.join(__dirname, '../../.eslintrc.js');
  let eslintIgnore = path.join(__dirname, '../../.eslintignore');
  const projectEslint = lintConfigPath && joinWithRootPath(lintConfigPath);
  if (fs.existsSync(projectEslint)) {
    eslintConfig = projectEslint;
  }
  let args = [eslintBin, checkPaths, '--config', eslintConfig];
  const remainingArgs = getRemainingArgs(program);
  if (fs.existsSync(ignoreConfigPath)) {
    eslintIgnore = ignoreConfigPath;
  }
  args.push('--ignore-path', eslintIgnore);
  args = [...args, ...remainingArgs];
  runCmd('node', args);
};
