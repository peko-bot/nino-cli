import { joinWithRootPath } from '../utils/common';

let injected = false;
function injectRequire() {
  if (injected) return;
  const Module = require('module');
  const oriRequire = Module.prototype.require;
  Module.prototype.require = function (...args: string[]) {
    const moduleName = args[0];
    try {
      return oriRequire.apply(this, args);
    } catch (err) {
      const newArgs = [...args];
      if (moduleName[0] !== '/') {
        newArgs[0] = joinWithRootPath(['node_modules', moduleName]);
      }
      return oriRequire.apply(this, newArgs);
    }
  };
  injected = true;
}

export { injectRequire };
