#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/test-jest');

program
  .option('-u, --update', 'to update snapshots')
  .option('-d, --codecov', 'coverage using jest')
  .option('-w, --watch', 'watch mode')
  .parse(process.argv);

nino.test(program);
