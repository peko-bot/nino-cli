const webpack = require('webpack');
const fs = require('fs-extra');
const { getDefaultConfig } = require('./handler');
const TscWatchClient = require('tsc-watch/client');
const path = require('path');
const watcher = new TscWatchClient();

const runWebpackDevServer = program => {
  const watch = program.watch;
  const { webpackConfig } = getDefaultConfig(program);
  watch && webpack(webpackConfig).watch({}, () => {});
  !watch && webpack(webpackConfig).run();
};

exports.koei = program => {
  const isTypeScriptBuild = program.isTypeScriptBuild;
  if (
    fs.existsSync(path.join(process.cwd(), 'tsconfig.json')) &&
    isTypeScriptBuild
  ) {
    watcher.on('first_success', () => {
      runWebpackDevServer(program);
    });
    watcher.start();
  } else {
    runWebpackDevServer(program);
  }
};
