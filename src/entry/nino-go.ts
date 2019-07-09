#!/usr/bin/env node

import program from 'commander';
import { go } from '../go';

program
  .option('-c, --config <path>', 'set config path, defaults to ~/nino.dev.js')
  .option('-e, --entry <path>', 'set entry path, defaults to ~/src/index.js')
  .parse(process.argv);

go(program);
