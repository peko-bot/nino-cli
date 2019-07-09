const { compile } = require('../dist/compile');

describe('nino compile', () => {
  it('default', () => {
    compile({
      entry: 'tests/cases/compile',
      output: 'dist/lib',
      outputEs: 'dist/es',
    });
  });
});
