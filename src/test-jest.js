const path = require('path');
const { runCmd } = require('./utils/runCommand');

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
