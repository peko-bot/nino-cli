const path = require('path');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('../webpack/commonConfig');
const { getProjectPath } = require('../babel/projectHelper.js');
const merge = require('webpack-merge');
const fs = require('fs');

const defaultDevServerOptions = {
  port: 9099,
  host: 'localhost',
  noInfo: true,
  clientLogLevel: 'error',
  contentBase: getProjectPath('src'),
};

const defaultWebpackConfig = {
  mode: 'development',
  watch: false,
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://' +
      defaultDevServerOptions.host +
      ':' +
      defaultDevServerOptions.port,
    getProjectPath('src'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: 'vendor/[name].[chunkHash:8].js',
  },
  plugins: [
    ...commonPlugin,
    new TohoLogPlugin({ defaultWords: true, isPray: false }),
  ],
  module: commonModule,
};

const getDefaultConfig = program => {
  let configFile = program.config;
  let webpackConfig = defaultWebpackConfig;
  let devServerConfig = defaultDevServerOptions;

  if (configFile) {
    configFile = path.join(getProjectPath(program.config));
    // fs.existsSync(configFile) &&
    const customizedConfig = require(configFile);
    if (!customizedConfig) {
      throw Error('check nino.go.js, there is something wrong with it.');
    }
    webpackConfig = merge(defaultWebpackConfig, customizedConfig.webpack);
    devServerConfig = merge(
      defaultDevServerOptions,
      customizedConfig.devServer,
    );
  }

  return { webpackConfig, devServerConfig };
};

module.exports = {
  defaultDevServerOptions,
  defaultWebpackConfig,
  getDefaultConfig,
};
