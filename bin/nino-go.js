#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/go');

program
  .option('-c, --config <path>', 'set config path, defaults to ~/nino.dev.js')
  .option('-e, --entry <path>', 'set entry path, defaults to ~/src/index.js')
  .parse(process.argv);

nino.go(program);
