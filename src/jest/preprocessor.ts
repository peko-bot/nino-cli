const { createTransformer: babelTransFormer } = require('babel-jest');
import { getBabelConfig } from '../babel/babelCommonConfig';
import { transformSync } from '@babel/core';
import * as path from 'path';
import { walk } from '../utils/common';
import * as fs from 'fs-extra';

function convertTargetModule2Cjs(libDir: string | undefined) {
  if (!libDir) {
    return;
  }
  const babelConfig = getBabelConfig();
  walk(path.join(process.cwd(), libDir))
    .filter(item => !item.includes('__tests__') && path.extname(item) === '.js')
    .map(item => {
      const targetFile = fs.readFileSync(item).toString();
      const { code: transformedCode } = transformSync(targetFile, {
        filename: path.basename(item),
        ...babelConfig,
      }) || { code: '' };
      fs.outputFileSync(item, transformedCode);
    });
}

const libDir = process.env.LIB_DIR;
if (libDir && libDir !== 'dist') {
  convertTargetModule2Cjs(libDir);
}
const realPaths = walk(path.join(process.cwd(), 'src')).filter(
  item => (!item.includes('__tests__') && path.extname(item) === '.tsx') || path.extname(item) === '.ts',
);

function replaceImportPath() {
  return {
    visitor: {
      ImportDeclaration(target: any) {
        if (target.node.source.value.includes('../')) {
          // remove all ../
          const removeRelatedPath = target.node.source.value.replace(/\.\.\//g, '');
          const selectContainedKeys = realPaths.filter(item => item.includes(removeRelatedPath));
          if (libDir && selectContainedKeys.length) {
            const targetRealPath = selectContainedKeys[0];
            const realPath = '../../../' + libDir + targetRealPath.split('/src')[1].split('.')[0];
            target.node.source.value = realPath;
          }
        }
      },
    },
  };
}

const babelConfig = getBabelConfig();
babelConfig.plugins.push(replaceImportPath);
const babelJest = babelTransFormer(babelConfig);

module.exports = {
  process(sourceCode: string, filePath: string) {
    const { code } = transformSync(sourceCode, {
      filename: path.basename(filePath),
      ...babelConfig,
    }) || { code: '' };
    return babelJest.process(code, filePath, {
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    });
  },
};
