#!/usr/bin/env node

import program from 'commander';
import { test } from '../jest';

const options = (program as any).opts();
options
  .option('-u, --update', 'to update snapshots', false)
  .option('--codecov', 'coverage using jest', false)
  .option('-w, --watch', 'watch mode', false)
  .option('-p, --path <path>', 'alias of testPathPattern')
  .allowUnknownOption()
  .parse(process.argv);

test(program);
