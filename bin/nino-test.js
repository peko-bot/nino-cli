#!/usr/bin/env node

const program = require('commander');
const nino = require('../src/test');

program.option('-u, --update', 'to update snapshots').parse(process.argv);

nino.test(program);
