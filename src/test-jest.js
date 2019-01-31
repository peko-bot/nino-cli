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
  // eslint-disable-next-line
  // console.log(`${data}`);
  // });
  // ls.stderr.on('data', data => {
  //   // eslint-disable-next-line
  //   console.log(`${data}`);
  // });
  ls.on('close', code => {
    if (code !== 0) {
      throw Error('check test cases please.');
    }
    callback && callback(code);
  });
}

exports.test = program => {
  // jest --config jest.js --verbose=false
  const isUpdate = !!program.update;
  const codecov = !!program.codecov;
  const jestBin = require.resolve('jest/bin/jest');
  const jestConfig = path.join(__dirname, '../src/jest/jest.js');
  let args = [jestBin, '--config', jestConfig];
  if (isUpdate) {
    args.push('-u');
  }
  if (codecov) {
    args.push('--verbose');
    args.push('false');
    args.push('-w');
    args.push('1');
    args.push('--coverage');
  }
  runCmd('node', args);
};
