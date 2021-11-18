import { compile } from '..';
import fs from 'fs-extra';
import { joinWithRootPath } from '../../utils/common';

const outputDirPaths = ['lib', 'es'];
const outputFilePaths = [
  'ts/assets/case-1',
  'ts/assets/case-2',
  'ts/case-3',
  'ts/src/calc.js',
  'ts/src/assets/case-4',
  'ts/src/assets/case-5',
  'ts/src/modules/add/index.js',
  'ts/src/modules/add/css.css',
  'tsx/assets/case-1',
  'tsx/assets/case-2',
  'tsx/case-3-tsx',
  'tsx/index-tsx.js',
  'tsx/src/calc-tsx.js',
  'tsx/src/modules/add/index-tsx.js',
  'tsx/src/modules/add/css-tsx.css',
  'tsx/src/assets/case-4',
  'tsx/src/assets/case-5',
];

const getContent = (paths: string[]) => fs.readFileSync(joinWithRootPath(paths)).toString();

describe('nino compile', () => {
  it('compile correctly', done => {
    compile({ entry: 'cases/compile' }, () => {
      for (const dir of outputDirPaths) {
        for (const file of outputFilePaths) {
          jest.setTimeout(10 * 1000);
          expect(getContent([dir, file])).toMatchSnapshot();
        }
      }
      done();
    });
  });
});
