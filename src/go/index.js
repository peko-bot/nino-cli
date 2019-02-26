const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { getDefaultConfig } = require('./handler');
const path = require('path');
const fs = require('fs-extra');
const TscWatchClient = require('tsc-watch/client');
const watch = new TscWatchClient();

const runWebpackDevServer = program => {
  const { webpackConfig, devServerConfig } = getDefaultConfig(program);
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, devServerConfig);
  server.listen(devServerConfig.port, devServerConfig.host);
};

exports.go = program => {
  if (fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
    watch.on('first_success', () => {
      runWebpackDevServer(program);
    });
    watch.start();
  } else {
    runWebpackDevServer(program);
  }
};
