const { resolve } = require('./projectHelper');

module.exports = function() {
  const plugins = [
    [
      'import',
      {
        libraryName: 'antd-mobile',
        style: 'css',
      },
      'antd-mobile',
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: 'css',
      },
      'antd',
    ],
    resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-syntax-dynamic-import'),
    resolve('@babel/plugin-transform-runtime'),
  ];
  return {
    presets: [resolve('@babel/preset-react'), resolve('@babel/preset-env')],
    plugins,
  };
};
