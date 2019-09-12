#!/usr/bin/env node

import program from 'commander';
import { dist } from '../dist';

program
  .option('-e, --entry <path>', 'set entry path. defaults to ~/src', 'src')
  .option(
    '-o, --output <path>',
    'set cjs output path. defaults to ~/dist',
    'dist',
  )
  .parse(process.argv);

dist(program);
