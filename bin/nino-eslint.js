#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/eslint');

program
  .option('-c, --config <path>', 'set config path, like .eslintrc.js')
  .option(
    '-i, --ignore <path>',
    'files you want to ignore with eslint, like .eslintignore',
  )
  .option('-f, --fix', 'fix lint problems')
  .parse(process.argv);

nino.eslint(program);
