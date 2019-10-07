const { getDefaultConfig } = require('../src/koei/handler');

describe('nino koei', () => {
  const defaultOptions = {
    config: null,
    dev: false,
    watch: false,
    output: 'dist',
  };

  it('custom config file', () => {
    expect(
      getDefaultConfig({
        ...defaultOptions,
        config: 'tests/cases/nino.koei.js',
      }).webpackConfig.output,
    ).toEqual({
      chunkFilename: 'vendor/[name].js',
      filename: '[name].js',
      path: 'test',
    });
  });
});
