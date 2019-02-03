const { getDefaultConfig } = require('../go/handler');
const merge = require('webpack-merge');

describe('nino go', () => {
  it('default config', () => {
    const config = getDefaultConfig({});
    expect(config.devServerConfig).toEqual(config.defaultDevServerOptions);
    expect(config.webpackConfig).toEqual(config.defaultWebpackConfig);
  });

  it('custom config file', () => {
    const config = getDefaultConfig({
      config: './test-case/nino.go',
    });
    expect(config.devServerConfig).toEqual(
      merge(config.defaultDevServerOptions, { port: 9098 }),
    );
    expect(config.webpackConfig).toEqual(
      merge(config.defaultWebpackConfig, { watch: true }),
    );
  });
});
