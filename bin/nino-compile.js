#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/compile');

program
  .option('-e, --entry <path>', 'set entry path. defaults to ~/src')
  .option('-o, --output', 'set cjs output path. defaults to ~/lib')
  .option('-oes, --outputEs', 'set es output path. defaults to ~/es')
  .parse(process.argv);

nino.compile(program);
