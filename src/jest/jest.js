const path = require('path');

module.exports = {
  setupFiles: [path.join(__dirname, '../../scripts/setup.js')],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  rootDir: process.cwd(),
  testPathIgnorePatterns: ['/node_modules/', 'node'],
  testRegex: '.*\\.test\\.js$',
  transform: { '\\.js$': path.join(__dirname, './preprocessor.js') },
  transformIgnorePatterns: [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
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
};
