#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();
import { pretty } from '../prettier';

program.option('-c, --config <path>', 'set config path').parse(process.argv);

pretty(program.opts());
