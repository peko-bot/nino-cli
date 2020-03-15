import path from 'path';
import { runCmd } from '../utils/common';

export const test = (program: any) => {
  const { update, codecov, watch, path: targetPath } = program;
  const jestBin = require.resolve('jest/bin/jest');
  const jestConfig = path.join(__dirname, './jest.js');
  const args = [jestBin, '--config', jestConfig];
  if (update) {
    args.push('-u');
  }
  if (codecov) {
    args.push('--coverage');
  }
  if (watch) {
    args.push('--watch');
  }
  if (targetPath) {
    args.push('--testPathPattern=' + targetPath);
  }
  runCmd('node', args);
};
