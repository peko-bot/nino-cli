/* eslint-disable no-underscore-dangle */

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const TohoLogPlugin = require('toho-log-plugin');
import { getDefaultWebpackConfig } from '../webpack/commonConfig';
import merge from 'webpack-merge';
import fs from 'fs-extra';
import { Configuration } from 'webpack';
import { joinWithRootPath } from '../utils/common';
import { getEntry } from '../go/handler';

const getWebpackConfig = (program: any) => {
  const { dev, watch, output, entry } = program;
  const _defaultWebpackConfig = getDefaultWebpackConfig(program);
  const plugins = [
    ..._defaultWebpackConfig.plugins,
    new TohoLogPlugin({ dev, isPray: false }),
  ];
  if (!watch) {
    plugins.push(
      new CleanWebpackPlugin({
        verbose: false,
      }),
    );
  }
  return Object.assign({}, _defaultWebpackConfig, {
    mode: dev ? 'development' : 'production',
    resolve: _defaultWebpackConfig.resolve,
    devtool: dev ? 'source-map' : '',
    entry: {
      ninoninoni: getEntry(entry),
    },
    output: {
      path: joinWithRootPath(output),
      filename: '[name].js',
      chunkFilename: 'vendor/[name].js',
    },
    plugins,
    module: _defaultWebpackConfig.module,
  });
};

export const getDefaultConfig = (program: any) => {
  const { config } = program;
  let webpackConfig: any = getWebpackConfig(program);
  if (config && fs.existsSync(joinWithRootPath(config))) {
    const customizedConfig = require(joinWithRootPath(config));
    webpackConfig = merge(webpackConfig as Configuration, customizedConfig);
    return { webpackConfig };
  }
  if (fs.existsSync(joinWithRootPath('nino.koei.js'))) {
    const customizedConfig = require(joinWithRootPath('nino.koei.js'));
    webpackConfig = merge(webpackConfig as Configuration, customizedConfig);
    return { webpackConfig };
  }
  return { webpackConfig };
};
