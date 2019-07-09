#!/usr/bin/env node

import program from 'commander';
import { koei } from '../koei';

program
  .option('-c, --config <path>', 'set config path. defaults to ~/koei.prod.js')
  .option('-w, --watch', 'turn on watch mode')
  .option('-t, --isTypeScriptBuild', 'for watching build of memo')
  .option(
    '-d, --dev',
    'mode of webpack, development || production, defaults to production',
  )
  .option(
    '-o, --output',
    'where to put dist, output path of webpack, like dist/main',
  )
  .parse(process.argv);

koei(program);
