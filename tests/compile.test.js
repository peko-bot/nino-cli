const { compile } = require('../dist/compile');
const fs = require('fs-extra');
const { joinWithRootPath } = require('../dist/utils/common');

describe('nino compile', () => {
  beforeAll(() => {
    compile({
      entry: 'tests/cases/compile',
    });
  });

  getContent = paths => fs.readFileSync(joinWithRootPath(paths)).toString();

  it('compile correctly', () => {
    const libContent = getContent(['lib', 'default.js']);
    expect(libContent).toMatchSnapshot();
    const esContent = getContent(['es', 'default.js']);
    expect(esContent).toMatchSnapshot();
  });
});
