// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const {
  getProjectPath,
  resolve,
  injectRequire,
} = require('../babel/projectHelper');

injectRequire();

const babelConfig = require('../babel/babelCommonConfig')();

module.exports = {
  commonModule: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: resolve('babel-loader'),
        options: babelConfig,
      },
    ],
  },
  commonPlugin: [
    new htmlWebpackPlugin({
      // 生成html
      template: './src/index.html',
      hash: true,
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: getProjectPath('src/assets'),
        to: getProjectPath('dist/lib/main/assets'),
      },
      {
        from: getProjectPath('src/mock'),
        to: getProjectPath('dist/lib/main/mock'),
      },
    ]),
    new WebpackBar({
      name: '少女祈祷中...  ',
      color: 'cyanBright',
    }),
  ],
};
