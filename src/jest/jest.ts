import * as path from 'path';
import { joinWithRootPath } from '../utils/common';

module.exports = {
  setupFiles: [path.join(__dirname, 'setup.js')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    window: {},
    'ts-jest': {
      diagnostics: false,
    },
  },
  rootDir: joinWithRootPath(''),
  testPathIgnorePatterns: ['/node_modules/', 'node'],
  transform: { '.[jt]s[x]?$': path.join(__dirname, './preprocessor.js') },
  transformIgnorePatterns: [
    '/dist/',
    '/lib/',
    '/es/',
    // for tree-shaking
    // e.g.
    // import { format as fnsFormat } from 'date-fns/esm'
    // =>
    // import fnsFormat from 'date-fns/format';
    'node_modules/[^/]+?/(?!(es|node_modules)/)',
  ],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join(
      __dirname,
      './__mocks__/fileMock.js',
    ),
    '\\.(css|scss)$': path.join(__dirname, './styleMock.js'),
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/scripts/**',
    '!**/es/**',
    '!**/lib/**',
  ],
};
