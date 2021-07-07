import TohoLogPlugin from 'toho-log-plugin';
import { getDefaultWebpackConfig } from '../webpack/commonConfig';
const { merge } = require('webpack-merge');
import fs from 'fs-extra';
import { Configuration } from 'webpack';
import { joinWithRootPath } from '../utils/common';
import { getEntry } from '../go/handler';

const getWebpackConfig = (program: any) => {
  const { dev, output, entry } = program;
  const defaultWebpackConfig = getDefaultWebpackConfig(program);
  const plugins = [...defaultWebpackConfig.plugins, new TohoLogPlugin({ dev, isPray: false })];
  return Object.assign({}, defaultWebpackConfig, {
    mode: dev ? 'development' : 'production',
    resolve: defaultWebpackConfig.resolve,
    devtool: dev ? 'source-map' : false,
    entry: {
      ninoninoni: getEntry(entry),
    },
    output: {
      path: joinWithRootPath(output),
      filename: '[name].js',
      chunkFilename: 'vendor/[name].js',
    },
    plugins,
    module: defaultWebpackConfig.module,
  });
};

export const getDefaultConfig = (program: any) => {
  const { config } = program;
  let webpackConfig: any = getWebpackConfig(program);
  let customizedConfig;

  if (config && fs.existsSync(joinWithRootPath(config))) {
    customizedConfig = require(joinWithRootPath(config));
  }
  if (fs.existsSync(joinWithRootPath('nino.koei.js'))) {
    customizedConfig = require(joinWithRootPath('nino.koei.js'));
  }

  webpackConfig = merge(webpackConfig as Configuration, customizedConfig);

  if (customizedConfig.entry) {
    webpackConfig.entry = customizedConfig.entry;
  }
  if (customizedConfig.plugins) {
    webpackConfig.plugins.shift();
    webpackConfig.plugins = [...webpackConfig.plugins, ...customizedConfig.plugins];
  }

  return { webpackConfig };
};
