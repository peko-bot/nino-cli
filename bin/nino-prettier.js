#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/prettier');

program.option('-c, --config <path>', 'set config path').parse(process.argv);

nino.prettier(program);
