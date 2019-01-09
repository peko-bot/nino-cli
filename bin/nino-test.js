#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

function runCmd(cmd, args, callback) {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', code => {
    callback && callback(code);
  });
}

// jest --config .jest.js --verbose=false
const jestBin = require.resolve('jest/bin/jest');
const jestConfig = path.join(process.cwd(), '/scripts/jest.js');
const args = [
  jestBin,
  '--config',
  __dirname + 'node_modules/nino-cli/scripts/jest.js',
  '--verbose=false',
];
runCmd('node', args);
