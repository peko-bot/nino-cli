const {
  getDefaultConfig,
  defaultDevServerOptions,
  defaultWebpackConfig,
} = require('../go/handler');
const merge = require('webpack-merge');

describe('nino go', () => {
  it('default config', () => {
    const config = getDefaultConfig({});
    expect(config.devServerConfig).toEqual(defaultDevServerOptions);
    expect(config.webpackConfig).toEqual(defaultWebpackConfig);
  });

  it('custom config file', () => {
    const config = getDefaultConfig({
      config: './test-case/nino.go',
    });
    expect(config.devServerConfig).toEqual(
      merge(defaultDevServerOptions, { port: 9098 }),
    );
    expect(config.webpackConfig).toEqual(
      merge(defaultWebpackConfig, { watch: true }),
    );
  });
});
