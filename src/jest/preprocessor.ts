const { createTransformer: babelTransFormer } = require('babel-jest');
const { createTransformer: tsTransFormer } = require('ts-jest');
import { getBabelConfig } from '../babel/babelCommonConfig';
import fs from 'fs-extra';
import chalk from 'chalk';
import { joinWithRootPath } from '../utils/common';

const tsTestConfigPath = fs.existsSync(joinWithRootPath('tsconfig.test.json'))
  ? joinWithRootPath('tsconfig.test.json')
  : joinWithRootPath('tsconfig.json');
const tsJest = tsTransFormer({
  tsConfig: tsTestConfigPath,
});
const babelConfig = getBabelConfig();
babelConfig.plugins = [...babelConfig.plugins];
const babelJest = babelTransFormer(babelConfig);

module.exports = {
  process(src: any, filePath: string) {
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
      // tslint:disable-next-line: no-console
      console.log(chalk.red('File not match type:'), filePath);
      throw new Error(`File not match type: ${filePath}`);
    }
    return src;
  },
};
