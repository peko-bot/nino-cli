export const getBabelConfig = (isEs?: boolean) => {
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
    require.resolve('@babel/plugin-transform-member-expression-literals'),
    require.resolve('@babel/plugin-transform-object-assign'),
    require.resolve('@babel/plugin-transform-property-literals'),
    require.resolve('@babel/plugin-transform-runtime'),
    require.resolve('@babel/plugin-transform-spread'),
    require.resolve('@babel/plugin-transform-template-literals'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
  ];
  let envPreset: any = require.resolve('@babel/preset-env');
  if (isEs) {
    envPreset = [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
      },
    ];
  }
  return {
    presets: [require.resolve('@babel/preset-react'), envPreset],
    plugins,
  };
};
