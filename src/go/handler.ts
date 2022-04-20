import fs from 'fs-extra';
import path from 'path';
import TohoLogPlugin from 'toho-log-plugin';
import { getDefaultWebpackConfig } from '../webpack/commonConfig';
const { merge } = require('webpack-merge');
import { Configuration } from 'webpack';
import { joinWithRootPath, getProjectTsconfig } from '../utils/common';

export const getEntry = (realEntry: string = '') => {
  const tsconfigFile = getProjectTsconfig();
  const tscOutDir = tsconfigFile.compilerOptions.outDir;
  const real = realEntry && realEntry !== 'src' ? [tscOutDir, realEntry] : realEntry;
  const targetEntry = joinWithRootPath(real);
  const extensions = ['.jsx', '.js', '.tsx', '.ts'];
  let entry;
  for (const item of extensions) {
    const targetPoint = path.join(targetEntry, 'index' + item);
    if (fs.existsSync(targetPoint)) {
      entry = targetPoint;
      break;
    }
  }
  return entry;
};

export const getDefaultConfig = (program: any) => {
  const { entry, port, config, copyAssetsFrom } = program;
  const defaultDevServerOptions = {
    port,
    host: 'localhost',
    static: joinWithRootPath(copyAssetsFrom),
  };
  const _defaultWebpackConfig = getDefaultWebpackConfig(program);
  const defaultWebpackConfig = Object.assign({}, _defaultWebpackConfig, {
    mode: 'development',
    watch: false,
    devtool: 'source-map',
    infrastructureLogging: {
      level: 'error',
    },
    stats: 'errors-only',
    entry: [
      'webpack-dev-server/client?http://' + defaultDevServerOptions.host + ':' + defaultDevServerOptions.port,
      getEntry(entry),
    ],
    output: {
      filename: '[name].js',
      chunkFilename: 'vendor/[name].[chunkHash:8].js',
    },
    plugins: [..._defaultWebpackConfig.plugins, new TohoLogPlugin({ defaultWords: true, isPray: false })],
  });
  let webpackConfig: any = defaultWebpackConfig;
  let devServerConfig: any = defaultDevServerOptions;
  let customizedConfig;

  if (config && fs.existsSync(joinWithRootPath(config))) {
    customizedConfig = require(joinWithRootPath(config));
  }
  if (fs.existsSync(joinWithRootPath('nino.go.js'))) {
    customizedConfig = require(joinWithRootPath('nino.go.js'));
  }

  webpackConfig = merge(defaultWebpackConfig as Configuration, customizedConfig.webpack);
  devServerConfig = merge(defaultDevServerOptions as Configuration, customizedConfig.devServer);

  return {
    webpackConfig,
    devServerConfig,
  };
};
