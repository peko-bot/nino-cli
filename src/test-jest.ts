import path from 'path';
import getRemainingArgs from 'commander-remaining-args';
import { runCmd } from './utils/common';

export const test = (program: any) => {
  const isUpdate = !!program.update;
  const codecov = !!program.codecov;
  const watch = !!program.watch;
  const jestBin = require.resolve('jest/bin/jest');
  const jestConfig = path.join(__dirname, './jest/jest.js');
  let args = [jestBin, '--config', jestConfig];
  if (isUpdate) {
    args.push('-u');
  }
  if (codecov) {
    args.push('-w');
    args.push('1');
    args.push('--coverage');
  }
  if (watch) {
    args.push('--watch');
  }

  const remainingArgs = getRemainingArgs(program);
  args = [...args, ...remainingArgs];
  runCmd('node', args);
};
