const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('./webpack/commonConfig');
const { getProjectPath } = require('./babel/projectHelper.js');

// maybe there is a bug
// getProjectPath('dist/lib/main')
// this can't release entry file to correct place
const defaultOutput = path.join(process.cwd(), 'dist/lib/main');
const getDefaultConfig = program => {
  const dev = !!program.dev;
  let configFile = program.config;
  const watch = !!program.watch;
  let webpackConfig = {};

  const defaultWebpackConfig = {
    mode: dev ? 'development' : 'production',
    watch,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: dev ? 'source-map' : '',
    entry: {
      ninoninoni: getProjectPath('src'),
    },
    output: {
      path: getProjectPath(defaultOutput),
      filename: '[name].js',
      chunkFilename: 'vendor/[name].js',
    },
    plugins: [
      ...commonPlugin,
      new TohoLogPlugin({ dev, isPray: false }),
      new CleanWebpackPlugin(['dist'], {
        root: getProjectPath(),
        verbose: false,
      }),
    ],
    module: commonModule,
  };

  if (configFile) {
    configFile = getProjectPath(program.config);
    const customizedConfig = fs.existsSync(configFile)
      ? require(configFile)
      : null;
    if (!customizedConfig) {
      throw Error('check nino.koei.js, there is something wrong with it.');
    }
    webpackConfig = Object.assign({}, defaultWebpackConfig, customizedConfig);
  } else {
    defaultWebpackConfig.output.path = program.output || defaultOutput;
    webpackConfig = defaultWebpackConfig;
  }

  return { webpackConfig };
};

exports.koei = program => {
  const { webpackConfig, watch } = getDefaultConfig(program);

  watch && webpack(webpackConfig).watch({}, () => {});

  !watch && webpack(webpackConfig).run();
};
