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
    expect(config.webpackConfig).toEqual(getDefaultWebpackConfig(program));
  });

  it('custom config file', () => {
    const config = getDefaultConfig({
      config: './test-case/nino.koei',
      ...program,
    });
    expect(config.webpackConfig).toEqual(
      merge(getDefaultWebpackConfig(program), {
        output: {
          path: 'test',
        },
      }),
    );
  });
});
