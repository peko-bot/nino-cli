import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const TohoLogPlugin = require('toho-log-plugin');
import {
  commonModule,
  commonPlugin,
  resolveModule,
} from '../webpack/commonConfig';
import { getProjectPath } from '../babel/projectHelper';
import merge from 'webpack-merge';
import { Configuration } from 'webpack';

// maybe there is a bug
// getProjectPath('dist/lib/main')
// this can't release entry file to correct place
const defaultOutput = 'dist';

export const getDefaultWebpackConfig = (program: any) => {
  const dev = !!program.dev;
  const watch = !!program.watch;
  const plugins = [...commonPlugin, new TohoLogPlugin({ dev, isPray: false })];
  // bug: watch mode of webpack maybe conflict with TypeScript's
  // webpack will rebuild, but copy-webpack-plugin won't run again
  // so you will lose your files that copied by copy-webpack-plugin
  // workaround: remove dist by userself
  if (!watch) {
    plugins.push(
      new CleanWebpackPlugin({
        verbose: false,
      }),
    );
  }
  const config = {
    mode: dev ? 'development' : 'production',
    resolve: resolveModule,
    devtool: dev ? 'source-map' : '',
    entry: {
      ninoninoni: getProjectPath('src'),
    },
    output: {
      path: getProjectPath(defaultOutput),
      filename: '[name].js',
      chunkFilename: 'vendor/[name].js',
    },
    plugins,
    module: commonModule,
  };

  return config;
};

export const getDefaultConfig = (program: any) => {
  let configFile = program.config;
  let webpackConfig = {};
  const config = getDefaultWebpackConfig(program);

  if (configFile) {
    configFile = getProjectPath(program.config);
    // fs.existsSync(configFile)
    const customizedConfig = require(configFile);
    if (!customizedConfig) {
      throw Error('check nino.koei.js, there is something wrong with it.');
    }
    webpackConfig = merge(config as Configuration, customizedConfig);
  } else {
    // defaultWebpackConfig.output.path = program.output || defaultOutput;
    webpackConfig = config;
  }

  return { webpackConfig };
};
