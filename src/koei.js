const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('../options/webpack.common');

exports.koei = program => {
  const dev = !!process.argv.toString().includes('development');
  let plugins = commonPlugin;

  // plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

  plugins.push(new TohoLogPlugin({ dev }));

  !dev &&
    plugins.push(
      new CleanWebpackPlugin(['dist'], {
        verbose: false,
      }),
    );

  const options = {
    mode: dev ? 'development' : 'production',
    watch: dev,
    devServer: {
      port: 9099,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: dev ? 'source-map' : '',
    entry: {
      main: path.join(process.cwd(), 'src'),
    },
    output: {
      path: path.join(process.cwd(), 'dist/lib/main'),
      filename: '[name].js',
      chunkFilename: dev
        ? 'vendor/[name].[chunkHash:8].js'
        : 'vendor/[name].js',
    },
    plugins,
    module: commonModule,
  };

  dev && webpack(options).watch({}, () => {});

  !dev && webpack(options).run();
};
