import path from 'path';
import fs from 'fs-extra';
const TohoLogPlugin = require('toho-log-plugin');
import {
  commonModule,
  commonPlugin,
  resolveModule,
} from '../webpack/commonConfig';
import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { joinWithRootPath } from '../utils/common';

const getEntry = (programEntry: string) => {
  if (programEntry) {
    return joinWithRootPath(programEntry);
  }
  const extensions = ['js', 'jsx', 'ts', 'tsx'];
  let entry;
  for (let i = 0; i < extensions.length; i++) {
    const item = extensions[i];
    if (fs.existsSync(joinWithRootPath('src/index.' + item))) {
      entry = joinWithRootPath('src/index.' + item);
      break;
    }
  }
  return entry;
};

const getDefaultConfig = (program: any) => {
  const entry = program.entry;
  const defaultDevServerOptions = {
    port: 9099,
    host: 'localhost',
    noInfo: true,
    clientLogLevel: 'error',
    contentBase: joinWithRootPath('src'),
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
      getEntry(entry),
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
    resolve: resolveModule,
  };
  let configFile = program.config;
  let webpackConfig: any = defaultWebpackConfig;
  let devServerConfig: any = defaultDevServerOptions;

  if (configFile) {
    configFile = path.join(joinWithRootPath(program.config));
    // fs.existsSync(configFile) &&
    const customizedConfig = require(configFile);
    if (!customizedConfig) {
      throw Error('check nino.go.js, there is something wrong with it.');
    }
    webpackConfig = merge(
      defaultWebpackConfig as Configuration,
      customizedConfig.webpack,
    );
    devServerConfig = merge(
      defaultDevServerOptions as Configuration,
      customizedConfig.devServer,
    );
  }

  return {
    webpackConfig,
    devServerConfig,
    defaultDevServerOptions,
    defaultWebpackConfig,
  };
};

export { getDefaultConfig };
