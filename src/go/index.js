const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { getDefaultConfig } = require('./handler');
const path = require('path');
const fs = require('fs-extra');

exports.go = program => {
  if (fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
  }

  const { webpackConfig, devServerConfig } = getDefaultConfig(program);
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, devServerConfig);
  server.listen(devServerConfig.port, devServerConfig.host);
};
