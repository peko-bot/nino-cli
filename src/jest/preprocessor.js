const { createTransformer } = require('babel-jest');
const babelCommonConfig = require('../babel/babelCommonConfig');

module.exports = {
  process(src, path, config, transformOptions) {
    const babelConfig = babelCommonConfig();
    babelConfig.plugins = [...babelConfig.plugins];
    const babelJest = createTransformer(babelConfig);
    return babelJest.process(src, path, config, transformOptions);
  },
};
