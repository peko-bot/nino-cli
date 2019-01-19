const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { getDefaultConfig } = require('./handler');

exports.go = program => {
  const { webpackConfig, devServerConfig } = getDefaultConfig(program);

  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, devServerConfig);

  server.listen(devServerConfig.port, devServerConfig.host);
};
