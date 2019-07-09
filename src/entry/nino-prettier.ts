#!/usr/bin/env node

import program from 'commander';
import { pretty } from '../prettier';

program.option('-c, --config <path>', 'set config path').parse(process.argv);

pretty(program);
