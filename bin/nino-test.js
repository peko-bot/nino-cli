#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

function runCmd(cmd, args, callback) {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  // for test
  // ls.stdout.on('data', (data) => {
  //   console.log(`${data}`);
  // });
  // ls.stderr.on('data', data => console.log(`${data}`))
  ls.on('close', code => {
    callback && callback(code);
  });
}

// jest --config .jest.js --verbose=false
const jestBin = require.resolve('jest/bin/jest');
const jestConfig = path.join(__dirname, '../scripts/jest.js');
const args = [jestBin, '--config', jestConfig, '--verbose=false'];
runCmd('node', args);
