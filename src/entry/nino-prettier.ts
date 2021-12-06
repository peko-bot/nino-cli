#!/usr/bin/env node

import program from 'commander';
import { pretty } from '../prettier';

const options = program.opts();
options.option('-c, --config <path>', 'set config path').parse(process.argv);

pretty(program);
