#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/go');

program
  .option(
    '-c, --config <path>',
    'set config path, defaults to ./nino.config.js',
  )
  .parse(process.argv);

nino.go(program);
