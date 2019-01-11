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

exports.test = () => {
  // jest --config jest.js --verbose=false
  const jestBin = require.resolve('jest/bin/jest');
  const jestConfig = path.join(__dirname, '../src/jest/jest.js');
  const args = [jestBin, '--config', jestConfig];
  runCmd('node', args);
};
