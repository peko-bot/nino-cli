const { getDefaultConfig } = require('../dist/go/handler');

describe('nino go', () => {
  const defaultOptions = {
    config: null,
    entry: 'src',
    output: 'dist',
    copyAssetsFrom: 'src',
    port: 9099,
  };

  it('default config', () => {
    expect(getDefaultConfig(defaultOptions)).toMatchSnapshot();
  });

  it('custom config file', () => {
    const config = getDefaultConfig({
      ...defaultOptions,
      config: 'tests/cases/nino.go',
    });
    expect(config.devServerConfig).toMatchSnapshot();
    expect(config.webpackConfig).toMatchSnapshot();
  });
});
