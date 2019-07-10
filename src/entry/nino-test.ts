#!/usr/bin/env node

import program from 'commander';
import { test } from '../test-jest';

program
  .option('-u, --update', 'to update snapshots')
  .option('-d, --codecov', 'coverage using jest')
  .option('-w, --watch', 'watch mode')
  .allowUnknownOption()
  .parse(process.argv);

test(program);
