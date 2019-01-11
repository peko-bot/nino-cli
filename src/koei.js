const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('./webpack/commonConfig');

exports.koei = program => {
  let dev = !!program.dev;
  let watch = !!program.watch;
  let plugins = commonPlugin;
  let outputPath = program.output || 'dist/lib/main';

  // plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  plugins.push(new TohoLogPlugin({ dev }));

  plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
      verbose: false,
    }),
  );

  const options = {
    mode: dev ? 'development' : 'production',
    watch,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: dev ? 'source-map' : '',
    entry: {
      main: path.join(process.cwd(), 'src'),
    },
    output: {
      path: path.join(process.cwd(), outputPath),
      filename: '[name].js',
      chunkFilename: dev
        ? 'vendor/[name].[chunkHash:8].js'
        : 'vendor/[name].js',
    },
    plugins,
    module: commonModule,
  };

  watch && webpack(options).watch({}, () => {});

  !watch && webpack(options).run();
};
