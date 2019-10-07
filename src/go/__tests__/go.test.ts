import { joinWithRootPath } from '../../utils/common';
import { getDefaultConfig } from '../handler';

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
      config: 'cases/nino.go.js',
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
