import webpack, { Configuration } from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import { getDefaultConfig } from './handler';
import { getProjectTsconfig } from '../utils/common';
import { copyRestFilesToTsc } from '../compile';

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
  runWebpackDevServer(program);
};
