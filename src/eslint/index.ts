import fs from 'fs-extra';
import { runCmd, joinWithRootPath } from '../utils/common';

export const eslint = (program: any) => {
  const isFix = program.fix;
  const configPath = program.config;
  const ignorePath = program.ignore;
  const eslintBin = require.resolve('eslint/bin/eslint');
  let eslintConfig = joinWithRootPath('.eslintrc.js');
  let eslintIgnore = joinWithRootPath('.eslintignore');
  const projectEslint = configPath && joinWithRootPath(configPath);
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
