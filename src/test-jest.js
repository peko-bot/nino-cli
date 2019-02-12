const { spawn } = require('child_process');
const path = require('path');

function runCmd(cmd, args, callback) {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', code => {
    if (code !== 0) {
      process.exit(code);
    }
    callback && callback(code);
  });
}

exports.test = program => {
  const isUpdate = !!program.update;
  const codecov = !!program.codecov;
  const jestBin = require.resolve('jest/bin/jest');
  const jestConfig = path.join(__dirname, './jest/jest.js');
  // Support args
  const additionalArgs = process.argv.slice(3);
  let args = [jestBin, '--config', jestConfig];
  if (isUpdate) {
    args.push('-u');
  }
  if (codecov) {
    args.push('-w');
    args.push('1');
    args.push('--coverage');
  }
  args.concat(additionalArgs).join(' ');
  runCmd('node', args);
};
