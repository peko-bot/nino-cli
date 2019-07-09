import path from 'path';
import fs from 'fs-extra';
import prettier from 'prettier';
const prettierConfigPath = require.resolve('../../.prettierrc');
import glob from 'glob';
import { joinWithRootPath } from '../utils/common';
import { trace, error } from '../utils/log';

const defaultConfig = {
  ignore: [
    '**/node_modules/**',
    '**/**.snap',
    '**/dist/**',
    '**/**.map',
    '**/lib/**',
    '**/public/**',
    '**/release/**',
    '**/**.css',
  ],
  // format target extension file
  // will format file with those extensions
  extension: ['.js', '.jsx', '.ts', '.tsx'],
};

export const pretty = (program: any) => {
  const configPath = program.config;
  let config = defaultConfig;
  if (configPath && fs.existsSync(joinWithRootPath(configPath))) {
    config = Object.assign({}, defaultConfig, require(configPath));
  }
  const files = glob.sync('**/src/**', {
    ignore: config.ignore,
  });
  if (!files.length) {
    return;
  }
  files.forEach(file => {
    if (fs.lstatSync(file).isDirectory()) {
      return;
    }
    if (!config.extension.includes(path.extname(file))) {
      return;
    }
    const options = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath,
    });
    const fileInfo = prettier.getFileInfo.sync(file);
    if (fileInfo.ignored) {
      return;
    }
    try {
      const input = fs.readFileSync(file, 'utf8');
      const withParserOptions = {
        ...options,
        parser: fileInfo.inferredParser,
      };
      const output = prettier.format(input, withParserOptions as any);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
        trace(`${file} is prettier`);
      } else {
        // check whether prettier succeed
        const isPrettier = prettier.check(input, withParserOptions as any);
        if (!isPrettier) {
          error(`${file} prettier failed, check please`);
        }
      }
    } catch (e) {
      process.exit(1);
      throw e;
    }
  });
};
