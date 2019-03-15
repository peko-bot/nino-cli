const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const fs = require('fs-extra');
const { getProjectPath, injectRequire } = require('../babel/projectHelper');
const packageInfo = require(getProjectPath('package.json'));

injectRequire();
const babelConfig = require('../babel/babelCommonConfig')();

let commonPlugin = [
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

let copyFiles = [];
const copyFilePaths = [
  {
    from: 'src/assets',
    to: 'dist/lib/main/assets',
  },
  {
    from: 'src/mock',
    to: 'dist/lib/main/mock',
  },
];

for (let item of copyFilePaths) {
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
  let paths = ['./src', '/', './lib'];
  for (let item of paths) {
    if (fs.exists(getProjectPath(item))) {
      entry = getProjectPath(item);
      break;
    }
  }
  return entry;
};

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
  },
  commonPlugin,
  resolveModule: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      [packageInfo.name]: getEntry(),
    },
  },
};
