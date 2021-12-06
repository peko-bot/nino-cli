#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();
import { test } from '../jest';

program
  .option('-u, --update', 'to update snapshots', false)
  .option('--codecov', 'coverage using jest', false)
  .option('-w, --watch', 'watch mode', false)
  .option('-p, --path <path>', 'alias of testPathPattern')
  .allowUnknownOption()
  .parse(process.argv);

test(program.opts());
