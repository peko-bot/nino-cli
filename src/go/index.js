const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { getDefaultConfig } = require('./handler');
const path = require('path');
const { runCmd } = require('../utils/runCommand');
const fs = require('fs-extra');

const runWebpackDevServer = program => {
  const { webpackConfig, devServerConfig } = getDefaultConfig(program);
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, devServerConfig);
  server.listen(devServerConfig.port, devServerConfig.host);
};

exports.go = program => {
  if (fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
    const tscBin = require.resolve('typescript/bin/tsc');
    // support args
    const additionalArgs = process.argv.slice(3);
    let args = [tscBin];
    runCmd('node', args, () => {
      runWebpackDevServer(program);

      args.concat(additionalArgs).join(' ');
      args.push('-w');
      runCmd('node', args);
    });
  } else {
    runWebpackDevServer(program);
  }
};
