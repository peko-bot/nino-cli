const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');
const prettierConfigPath = require.resolve('../../.prettierrc');
const defaultConfig = require('./config');
const glob = require('glob');
const chalk = require('chalk');

exports.prettier = program => {
  const configPath = program.config;
  let config = defaultConfig;
  if (configPath && fs.exists(path.join(process.cwd(), configPath))) {
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
      const output = prettier.format(input, withParserOptions);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
        // eslint-disable-next-line
        console.log(chalk.cyanBright(`${file} is prettier`));
      } else {
        // check whether prettier succeed
        const isPrettier = prettier.check(input, withParserOptions);
        if (!isPrettier) {
          // eslint-disable-next-line
          console.log(chalk.yellow(`${file} prettier failed, check please`));
        }
      }
    } catch (e) {
      process.exit(1);
      throw e;
    }
  });
};
