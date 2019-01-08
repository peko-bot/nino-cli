const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TohoLogPlugin = require('toho-log-plugin');
const { commonModule, commonPlugin } = require('../options/webpack.common');

exports.go = program => {
  // const configFile = path.join(
  //   process.cwd(),
  //   program.config || 'nino.config.js',
  // );

  let plugins = commonPlugin;

  // plugins.push(new webpack.HotModuleReplacementPlugin());
  // plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new TohoLogPlugin({ defaultWords: true }));

  const devServerOptions = {
    port: 9099,
    // hot: true,
    host: 'localhost',
    noInfo: true,
    clientLogLevel: 'error',
    contentBase: path.join(process.cwd(), 'src'),
    disableHostCheck: true,
  };

  const webpackConfig = {
    mode: 'development',
    watch: false,
    devtool: 'source-map',
    entry: [
      'webpack-dev-server/client?http://' +
        devServerOptions.host +
        ':' +
        devServerOptions.port,
      process.cwd() + '/src',
    ],
    output: {
      filename: '[name].js',
      chunkFilename: 'vendor/[name].[chunkHash:8].js',
    },
    plugins,
    module: commonModule,
  };

  const compiler = webpack(webpackConfig);

  const server = new webpackDevServer(compiler, devServerOptions);

  server.listen(devServerOptions.port, devServerOptions.host);
};

exports.koei = program => {};
