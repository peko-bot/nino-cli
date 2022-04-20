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

  it('custom config file', done => {
    jest.useFakeTimers('legacy');
    const config = getDefaultConfig({
      ...defaultOptions,
      config: 'cases/nino.go.js',
    });
    expect(config.devServerConfig).toEqual({
      static: joinWithRootPath('src'),
      host: 'localhost',
      port: 9098,
    });
    done();
  });
});
