#!/usr/bin/env node

import program from 'commander';
import { eslint } from '../eslint';

program
  .option('-c, --lintConfigPath <path>', 'set config path, such as .eslintrc.js')
  .option('-i, --ignoreConfigPath <path>, such as .eslintignore', 'files you want to ignore with eslint')
  .option('--checkPaths [path]', 'files need check, such as src/**/*.ts', '**/*.@(ts|tsx)')
  .allowUnknownOption()
  .parse(process.argv);

eslint(program);
