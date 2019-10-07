import { getDefaultConfig } from '../handler';

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
        config: 'cases/nino.koei.js',
      }).webpackConfig.output,
    ).toEqual({
      chunkFilename: 'vendor/[name].js',
      filename: '[name].js',
      path: 'test',
    });
  });
});
