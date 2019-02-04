#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/compile');

program
  .option('-e, --entry <path>', 'set entry path. defaults to ~/src')
  .option('-o, --output', 'set output path. defaults to ~/dist')
  .parse(process.argv);

nino.compile(program);
