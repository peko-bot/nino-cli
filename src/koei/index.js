const webpack = require('webpack');
const { getDefaultConfig } = require('./hander');

exports.koei = program => {
  const { webpackConfig, watch } = getDefaultConfig(program);

  watch && webpack(webpackConfig).watch({}, () => {});

  !watch && webpack(webpackConfig).run();
};
