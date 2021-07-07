import * as path from 'path';
import * as fs from 'fs-extra';
import { spawn } from 'child_process';
import { walk as walker } from 'walk';
const cwd = process.cwd();

export const joinWithRootPath = (paths: string | string[]) => {
  if (Array.isArray(paths)) {
    return path.join(cwd, ...paths);
  }
  return path.join(cwd, paths);
};

export const walkSync = async (dir: string) =>
  await new Promise(resolve => {
    const result: string[] = [];
    const w = walker(dir, { followLinks: false });
    w.on('file', (root, stat, next) => {
      result.push(root + '/' + stat.name);
      next();
    });
    w.on('end', function () {
      resolve(result);
    });
  }).catch(err => {
    throw Error(err);
  });

export const walk = (dir: string) => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

export const runCmd = (cmd: string, args: string[], callback?: Function) => {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', (code: any) => {
    if (code !== 0) {
      process.exit(code);
    }
    if (callback) {
      callback(code);
    }
  });
};

export const getProjectTsconfig = (url?: string) => {
  if (url && fs.existsSync(joinWithRootPath(url))) {
    return require(joinWithRootPath(url));
  }
  if (fs.existsSync(joinWithRootPath('tsconfig.json'))) {
    return require(joinWithRootPath('tsconfig.json'));
  }
  return '';
};
