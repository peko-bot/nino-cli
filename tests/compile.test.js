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
    expect(libContent).toBe(`"use strict";

var _dateFns = require("date-fns");

var defaultFunc = function defaultFunc(prefix) {
  // tslint:disable-next-line: no-console
  console.log("".concat(prefix, ": ").concat((0, _dateFns.format)(new Date(), 'yyyy-MM-dd hh:mm:ss')));
};

defaultFunc('timeStamp:');`);
    const esContent = getContent(['es', 'default.js']);
    expect(esContent).toBe(`import { format } from 'date-fns';

var defaultFunc = function defaultFunc(prefix) {
  // tslint:disable-next-line: no-console
  console.log("".concat(prefix, ": ").concat(format(new Date(), 'yyyy-MM-dd hh:mm:ss')));
};

defaultFunc('timeStamp:');`);
  });
});
