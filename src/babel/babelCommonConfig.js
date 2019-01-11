const { resolve } = require('./projectHelper');

module.exports = function(modules) {
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
    resolve('@babel/plugin-transform-member-expression-literals'),
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-transform-property-literals'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ],
    resolve('@babel/plugin-transform-spread'),
    resolve('@babel/plugin-transform-template-literals'),
    resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-proposal-export-default-from'),
    resolve('@babel/plugin-proposal-export-namespace-from'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        decoratorsBeforeExport: true,
      },
    ],
    resolve('@babel/plugin-syntax-dynamic-import'),
  ];
  return {
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules,
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
    ],
    plugins,
  };
};
