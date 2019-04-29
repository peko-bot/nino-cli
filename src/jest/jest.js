const path = require('path');

module.exports = {
  verbose: false,
  setupFiles: [path.join(__dirname, 'setup.js')],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    window: true,
    'ts-jest': {
      diagnostics: false,
    },
  },
  rootDir: process.cwd(),
  testPathIgnorePatterns: ['/node_modules/', 'node'],
  transform: { '\\.[jt]sx?$': path.join(__dirname, './preprocessor.js') },
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
    // https://github.com/babel/babel/issues/8731#issuecomment-423845498
    'node_modules/(^generic-)/i',
    'node_modules/code-js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join(
      __dirname,
      '../../__mocks__/fileMock.js',
    ),
    '\\.(css|scss)$': path.join(__dirname, '../../__mocks__/styleMock.js'),
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
