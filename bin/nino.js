#!/usr/bin/env node

const program = require('commander');
const info = require('../package.json');

program
  .version(info.version, '-v, --version')
  .usage('[command] [options]')
  .command('go [options]', 'to start a server, for development')
  .command(
    'koei [options]',
    'to build and write static files to `config.output`',
  )
  .command('test [options]', 'run test, using jest and enzyme')
  .parse(process.argv);

process.on('SIGINT', function() {
  program.runningCommand && program.runningCommand.kill('SIGKILL');
  process.exit(0);
});
