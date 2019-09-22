const { getDefaultConfig } = require('../dist/go/handler');
const { joinWithRootPath } = require('../dist/utils/common');

describe('nino go', () => {
  const defaultOptions = {
    config: null,
    entry: 'src',
    output: 'dist',
    copyAssetsFrom: 'src',
    port: 9099,
  };

  it('custom config file', () => {
    const config = getDefaultConfig({
      ...defaultOptions,
      config: 'tests/cases/nino.go.js',
    });
    expect(config.devServerConfig).toEqual({
      clientLogLevel: 'error',
      contentBase: joinWithRootPath('src'),
      host: 'localhost',
      noInfo: true,
      port: 9098,
    });
  });
});
