const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('./webpack/commonConfig');
const { getProjectPath } = require('./babel/projectHelper.js');

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
    const { webpack, devServer } = fs.existsSync(configFile)
      ? require(configFile)
      : null;
    if (!customizedConfig) {
      throw Error('check nino.go.js, there is something wrong with it.');
    }
    webpackConfig = Object.assign({}, defaultWebpackConfig, webpack);
    devServerConfig = Object.assign({}, defaultDevServerOptions, devServer);
  }

  return { webpackConfig, devServerConfig };
};

exports.go = program => {
  const { webpackConfig, devServerConfig } = getDefaultConfig(program);

  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, devServerConfig);

  server.listen(devServerConfig.port, devServerConfig.host);
};
