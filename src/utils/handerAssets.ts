import fs from 'fs-extra';

export const walk = (dir: string) => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && !file.includes('src/assets') && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

export const getAssets = (dir: string) =>
  walk(dir).filter(f => f.includes('assets'));
