const webpack = require('webpack');
const { getDefaultConfig } = require('./handler');

exports.koei = program => {
  const { webpackConfig } = getDefaultConfig(program);
  const watch = !!program.watch;

  watch && webpack(webpackConfig).watch({}, () => {});

  !watch && webpack(webpackConfig).run();
};
