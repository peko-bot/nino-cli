#!/usr/bin/env node

const program = require('commander');
const info = require('../package.json');
const proc = program.runningCommand;

program
  .version(info.version, '-v, --version')
  .usage('[command] [options]')
  .command('go [options]', 'to start a server, for development')
  .command(
    'koei [options]',
    'to build and write static files to `config.output`',
  )
  .command('test [options]', 'run test, using jest and enzyme')
  .command('compile [options]', 'es6 -> es5')
  .command('prettier [options]', 'prettier for code')
  .parse(process.argv);

process.on('SIGINT', function() {
  proc && proc.kill('SIGKILL');
  process.exit(0);
});

if (proc) {
  proc.on('error', () => {
    process.exit(1);
  });
  proc.on('close', process.exit.bind(process));
}
