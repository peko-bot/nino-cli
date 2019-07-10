const { getDefaultConfig } = require('../dist/koei/handler');

describe('nino koei', () => {
  const defaultOptions = {
    config: null,
    dev: false,
    watch: false,
  };

  it('default config', () => {
    expect(getDefaultConfig(defaultOptions)).toMatchSnapshot();
  });

  it('custom config file', () => {
    expect(
      getDefaultConfig({
        ...defaultOptions,
        config: 'tests/cases/nino.koei',
      }),
    ).toMatchSnapshot();
  });
});
