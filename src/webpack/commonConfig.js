const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  getProjectPath,
  resolve,
  injectRequire,
} = require('../babel/projectHelper');

injectRequire();

const babelConfig = require('../babel/babelCommonConfig')(false);

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
        from: path.join(process.cwd(), 'src/assets'),
        to: path.join(process.cwd(), 'dist/lib/main/assets'),
      },
      {
        from: path.join(process.cwd(), 'src/mock'),
        to: path.join(process.cwd(), 'dist/lib/main/mock'),
      },
    ]),
  ],
};
