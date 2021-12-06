#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();
import { dist } from '../dist';

program
  .option('-e, --entry <path>', 'set entry path. defaults to ~/src', 'src')
  .option('-o, --output <path>', 'set cjs output path. defaults to ~/dist', 'dist')
  .opts();

dist(program.opts());
