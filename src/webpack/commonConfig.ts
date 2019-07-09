const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
import WebpackBar from 'webpackbar';
import fs from 'fs-extra';
import { getProjectPath, injectRequire } from '../babel/projectHelper';
const packageInfo = require(getProjectPath('package.json'));
import { getAssets } from '../utils/handerAssets';
import { getBabelConfig } from '../babel/babelCommonConfig';
const babelConfig = getBabelConfig();
injectRequire();
const defaultOutput = 'dist';

export const commonPlugin = [
  new htmlWebpackPlugin({
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
    color: 'cyanBright',
  }),
];

const copyFiles = [];
const copyFilePaths = [];

for (const item of getAssets('src')) {
  copyFilePaths.push({
    from: item,
    to: defaultOutput + '/assets',
  });
}

for (const item of copyFilePaths) {
  if (fs.existsSync(getProjectPath(item.from))) {
    copyFiles.push({
      from: getProjectPath(item.from),
      to: getProjectPath(item.to),
    });
  }
}

if (copyFiles.length !== 0) {
  commonPlugin.push(new CopyWebpackPlugin(copyFiles));
}

const getEntry = () => {
  let entry = '';
  const paths = ['./src', '/', './lib'];
  for (const item of paths) {
    if (fs.existsSync(getProjectPath(item))) {
      entry = getProjectPath(item);
      break;
    }
  }
  return entry;
};

export const commonModule = {
  // noParse: /\.map$/,
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
            configFile: getProjectPath('tsconfig.json'),
          },
        },
      ],
    },
  ],
};

export const resolveModule = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  alias: {
    [packageInfo.name]: getEntry(),
  },
};
