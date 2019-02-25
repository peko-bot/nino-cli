const { createTransformer: babelTransFormer } = require('babel-jest');
const { createTransformer: tsTransFormer } = require('ts-jest');
const babelCommonConfig = require('../babel/babelCommonConfig');
const path = require('path');

const tsJest = tsTransFormer({
  tsConfig: path.join(__dirname, 'tsconfig.test.json'),
});

const babelConfig = babelCommonConfig();
babelConfig.plugins = [...babelConfig.plugins];
const babelJest = babelTransFormer(babelConfig);

module.exports = {
  process(src, filePath) {
    const isTypeScript = filePath.endsWith('.ts') || filePath.endsWith('.tsx');
    const isJavaScript = filePath.endsWith('.js') || filePath.endsWith('.jsx');
    if (isTypeScript) {
      src = tsJest.process(src, filePath, {
        moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      });
    } else if (isJavaScript) {
      src = babelJest.process(src, filePath, {
        moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      });
    } else {
      // eslint-disable-next-line
      console.log(chalk.red('File not match type:'), filePath);
      throw new Error(`File not match type: ${filePath}`);
    }
    return src;
  },
};
