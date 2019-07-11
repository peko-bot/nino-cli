import webpack, { Configuration } from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import fs from 'fs-extra';
import { getDefaultConfig } from './handler';
import TscWatchClient from 'tsc-watch/client';
import { joinWithRootPath, getProjectTsconfig } from '../utils/common';
import { copyRestFilesToTsc } from '../compile';
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

export const go = (program: any) => {
  const { copyAssetsFrom } = program;
  copyRestFilesToTsc(
    copyAssetsFrom,
    getProjectTsconfig().compilerOptions.outDir,
  );
  if (fs.existsSync(joinWithRootPath('tsconfig.json'))) {
    watch.on('first_success', () => {
      runWebpackDevServer(program);
    });
    watch.start();
  } else {
    runWebpackDevServer(program);
  }
};
