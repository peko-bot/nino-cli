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
  .parse(process.argv);

koei(program);
