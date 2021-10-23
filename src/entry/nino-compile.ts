#!/usr/bin/env node

import program from 'commander';
import { compile } from '../compile';

const options = (program as any).opts();
options
  .option('-e, --entry <path>', 'set entry path. defaults to ~/src', 'src')
  .option('--lib-output', 'set cjs output path. defaults to ~/lib', 'lib')
  .option('--es-output', 'set es output path. defaults to ~/es', 'es')
  .parse(process.argv);

compile(program);
