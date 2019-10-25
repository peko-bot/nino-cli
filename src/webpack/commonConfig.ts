const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
import WebpackBar from 'webpackbar';
import fs from 'fs-extra';
import path from 'path';
import { injectRequire } from '../babel/projectHelper';
import { joinWithRootPath, walk } from '../utils/common';
const packageInfo = require(joinWithRootPath('package.json'));
import { getBabelConfig } from '../babel/babelCommonConfig';
const babelConfig = getBabelConfig();
injectRequire();

export const getAssetPaths = (entry: string = 'src', output: string = 'dist') => {
  const copyFiles = [];
  const copyFilePaths: any[] = walk(entry)
    .filter(f => !['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(f)))
    .filter(f => f.includes('assets'));

  for (const from of copyFilePaths) {
    copyFiles.push({
      from,
      to: joinWithRootPath(`${output}/assets`),
    });
  }
  return copyFiles;
};

const getPlugins = (entry: string, output: string, copyAssets: boolean) => {
  const result = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new WebpackBar({
      name: '少女祈祷中...  ',
      color: 'pink',
    }),
  ];
  if (copyAssets) {
    const copyFiles = getAssetPaths(entry, output);
    if (copyFiles.length !== 0) {
      result.push(new CopyWebpackPlugin(copyFiles));
    }
  }
  return result;
};

const getAliasEntry = () => {
  let result = '';
  for (const item of ['./src', '/', './es', './dist']) {
    if (fs.existsSync(joinWithRootPath(item))) {
      result = joinWithRootPath(item);
      break;
    }
  }
  return result;
};

export const getResolves = () => {
  return {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      [packageInfo.name]: getAliasEntry(),
    },
  };
};

export const getModules = () => {
  return {
    // noParse: /\.map$/,
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
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
        loader: require.resolve('babel-loader'),
        options: babelConfig,
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: [
          { loader: require.resolve('babel-loader'), options: babelConfig },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: joinWithRootPath('tsconfig.json'),
            },
          },
        ],
      },
    ],
  };
};

export const getDefaultWebpackConfig = ({ copyAssetsFrom, output, copyAssets }: any) => {
  return {
    plugins: getPlugins(copyAssetsFrom, output, copyAssets),
    resolve: getResolves(),
    module: getModules(),
  };
};
