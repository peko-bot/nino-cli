#!/usr/bin/env node

import program from 'commander';
import { koei } from '../koei';

program
  .option('-c, --config <path>', 'set config path')
  .option('-w, --watch', 'turn on watch mode, defaults to false', false)
  .option(
    '-d, --dev',
    'mode of webpack, development || production, defaults to production, false',
    false,
  )
  .option(
    '-o, --output <path>',
    'path to save dist files, defaults to dist',
    'dist',
  )
  .option('--not-copy-assets', 'whether all assets file in src')
  .parse(process.argv);

koei(program);
