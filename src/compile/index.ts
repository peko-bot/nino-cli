import { transformSync } from '@babel/core';
import fs from 'fs-extra';
import path from 'path';
import { injectRequire } from '../babel/projectHelper';
import { getBabelConfig } from '../babel/babelCommonConfig';
import { joinWithRootPath, walkSync } from '../utils/common';
import { info, trace } from '../utils/log';
injectRequire();

const compileJSX = (files: string[], entry: string, output: string, target: 'es2015' | 'es2015+') => {
  for (const file of files) {
    const outputPath = file.replace(entry, output);
    if (path.extname(file) === '.ts' || path.extname(file) === '.tsx') {
      const fileContent = fs.readFileSync(file, 'utf8');
      const result = transformSync(fileContent, {
        sourceMaps: 'inline',
        filename: path.basename(file),
        ...getBabelConfig(target === 'es2015+'),
      });
      if (result) {
        fs.outputFileSync(outputPath.replace('.tsx', '.jsx').replace('.ts', '.js').replace('.jsx', '.js'), result.code);
      }
    } else if (!file.endsWith('.map')) {
      fs.copySync(file, outputPath);
    }
  }
};

export const copyRestFilesToTsc = async (input: string, outputPrefix: string) => {
  const files: any = await walkSync(input);
  files
    .filter((file: any) => {
      const ext = path.extname(file);
      // ignore sourcemap from tsc, babel will generate them.
      if (ext !== '.ts' && ext !== '.tsx' && ext !== '.map') {
        return true;
      }
    })
    .filter((file: any) => path.basename(file) !== 'tsconfig.json')
    .map((file: any) => {
      if (file !== file.replace(input, outputPrefix)) {
        fs.copySync(joinWithRootPath(file), joinWithRootPath(file.replace(input, outputPrefix)));
      }
    });
};

export const compile = async (program: any, callback?: () => void) => {
  const { entry = 'src', libOutput = 'lib', esOutput = 'es' } = program;

  trace(`少女边清理着名为 ${libOutput}/${esOutput} 的钱箱，边回顾着即将结束的多年单身生活`);
  await new Promise(resolve => {
    setTimeout(() => {
      trace('...顺带又感慨了下自己一平如洗的身板');
      resolve(null);
    }, 2000);
  });

  const entryFiles: any = await walkSync(joinWithRootPath(entry));
  await copyRestFilesToTsc(entry, libOutput);
  await copyRestFilesToTsc(entry, esOutput);
  compileJSX(entryFiles, entry, libOutput, 'es2015');
  compileJSX(entryFiles, entry, esOutput, 'es2015+');
  info('少女换上了新的钱箱，开始了一年新的单身生活');
  if (callback) {
    callback();
  }
};
