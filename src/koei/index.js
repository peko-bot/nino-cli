const webpack = require('webpack');
const { getDefaultConfig } = require('./handler');

exports.koei = program => {
  const { webpackConfig, watch } = getDefaultConfig(program);

  watch && webpack(webpackConfig).watch({}, () => {});

  !watch && webpack(webpackConfig).run();
};
