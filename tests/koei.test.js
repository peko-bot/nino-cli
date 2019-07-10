const { getDefaultConfig } = require('../dist/koei/handler');
const { joinWithRootPath } = require('../dist/utils/common');

describe('nino koei', () => {
  const defaultOptions = {
    config: null,
    dev: false,
    watch: false,
  };

  it('default config', () => {
    expect(getDefaultConfig(defaultOptions).webpackConfig.output).toEqual({
      chunkFilename: 'vendor/[name].js',
      filename: '[name].js',
      path: joinWithRootPath('dist'),
    });
  });

  it('custom config file', () => {
    expect(
      getDefaultConfig({
        ...defaultOptions,
        config: 'tests/cases/nino.koei',
      }).webpackConfig.output,
    ).toEqual({
      chunkFilename: 'vendor/[name].js',
      filename: '[name].js',
      path: joinWithRootPath('dist'),
    });
  });
});
