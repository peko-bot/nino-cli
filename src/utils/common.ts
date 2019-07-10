import path from 'path';
import { format } from 'date-fns';
import { spawn } from 'child_process';
import { walk as walker } from 'walk';

export const joinWithRootPath = (paths: string | string[]) => {
  if (Array.isArray(paths)) {
    return path.join(process.cwd(), ...paths);
  }
  return path.join(process.cwd(), paths);
};

export const getTimeStamp = () => format(new Date(), 'yyyyMMddHHmmss');

export const getDateStamp = () => format(new Date(), 'yyyyMMdd');

export const walk = async (dir: string) =>
  await new Promise(resolve => {
    const result: string[] = [];
    const w = walker(dir, { followLinks: false });
    w.on('file', (root, stat, next) => {
      result.push(root + '/' + stat.name);
      next();
    });
    w.on('end', function() {
      resolve(result);
    });
  }).catch(err => {
    throw Error(err);
  });

export const runCmd = (cmd: string, args: string[], callback?: Function) => {
  args = args || [];
  const ls = spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
  });
  ls.on('close', code => {
    if (code !== 0) {
      process.exit(code);
    }
    if (callback) {
      callback(code);
    }
  });
};
