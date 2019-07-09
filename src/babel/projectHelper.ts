import path from 'path';
const cwd = process.cwd();

function getProjectPath(...filePath: string[]) {
  return path.join(cwd, ...filePath);
}

let injected = false;
function injectRequire() {
  if (injected) return;
  const Module = require('module');
  const oriRequire = Module.prototype.require;
  Module.prototype.require = function(...args: string[]) {
    const moduleName = args[0];
    try {
      return oriRequire.apply(this, args);
    } catch (err) {
      const newArgs = [...args];
      if (moduleName[0] !== '/') {
        newArgs[0] = getProjectPath('node_modules', moduleName);
      }
      return oriRequire.apply(this, newArgs);
    }
  };
  injected = true;
}

export { getProjectPath, injectRequire };
