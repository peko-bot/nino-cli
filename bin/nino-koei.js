#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/koei');

program
  .option(
    '-c, --config <path>',
    'set config path. defaults to ./koei.config.js',
  )
  .parse(process.argv);

nino.koei(program);
