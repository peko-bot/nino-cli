const fs = require('fs-extra');

const walk = dir => {
  let results = [];
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

const getAssets = dir => walk(dir).filter(f => f.includes('assets'));

module.exports = { walk, getAssets };
