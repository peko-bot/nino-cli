import webpack, { Configuration } from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';
import fs from 'fs-extra';
import { getDefaultConfig } from './handler';
import TscWatchClient from 'tsc-watch/client';

const watch = new TscWatchClient();

const runWebpackDevServer = (program: any) => {
  const { webpackConfig, devServerConfig } = getDefaultConfig(program);
  const compiler = webpack(webpackConfig as Configuration);
  const server = new webpackDevServer(
    compiler,
    devServerConfig as Configuration,
  );
  server.listen(devServerConfig.port, devServerConfig.host);
};

exports.go = (program: any) => {
  if (fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
    watch.on('first_success', () => {
      runWebpackDevServer(program);
    });
    watch.start();
  } else {
    runWebpackDevServer(program);
  }
};
