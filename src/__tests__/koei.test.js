const {
  getDefaultConfig,
  getDefaultWebpackConfig,
} = require('../koei/handler');
const merge = require('webpack-merge');

describe('nino koei', () => {
  const program = {
    dev: false,
    watch: false,
  };
  it('default config', () => {
    const config = getDefaultConfig(program);
    expect({ ...config.webpackConfig, ...{ plugins: [] } }).toMatchObject({
      ...getDefaultWebpackConfig(program),
      ...{ plugins: [] },
    });
  });

  it('custom config file', () => {
    const webpackConfig = getDefaultConfig({
      config: './test-case/nino.koei',
      ...program,
    }).webpackConfig;
    const customWebpackConfig = merge(getDefaultWebpackConfig(program), {
      output: {
        path: 'test',
      },
    }).webpackConfig;
    expect({
      ...webpackConfig,
      ...{ plugins: [] },
    }).toMatchObject({
      ...customWebpackConfig,
      ...{ plugins: [] },
    });
  });
});
