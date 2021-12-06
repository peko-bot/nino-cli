#!/usr/bin/env node

import program from 'commander';
import { go } from '../go';

const options = program.opts();
options
  .option('-c, --config <path>', 'set additional config path, and those options will be merged with defaults')
  .option('-e, --entry <path>', 'set entry path, defaults to ~/src, such as ~/src/index.js', 'src')
  .option('-o, --output <path>', 'set static path, for dev-server, defaults to ~/dist', 'dist')
  .option('-p, --port <port>', 'set port for dev-server, defaults to 9099', '9099')
  .option('--copyAssetsFrom <path>', 'set source code path, defaults to ~/src', 'src')
  .parse(process.argv);

go(program);
