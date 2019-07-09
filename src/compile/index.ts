import { transformSync } from '@babel/core';
import fs from 'fs-extra';
import path from 'path';
import { injectRequire } from '../babel/projectHelper';
import { getBabelConfig } from '../babel/babelCommonConfig';
import { joinWithRootPath, walk, runCmd } from '../utils/common';
import { info, trace } from '../utils/log';
injectRequire();

const compileJSX = (
  files: string[],
  entry: string,
  output: string,
  target: 'es2015' | 'es2015+',
) => {
  for (const file of files) {
    const outputPath = file.replace(entry, output);
    if (file.endsWith('js') || file.endsWith('jsx')) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const result = transformSync(
        fileContent,
        getBabelConfig(target === 'es2015+'),
      );
      if (result) {
        fs.outputFileSync(outputPath.replace('.jsx', '.js'), result.code);
      }
    } else {
      fs.copySync(file, outputPath);
    }
  }
};

const copyRestFilesToTsc = (input: string, outputPrefix: string) =>
  walk(input)
    .filter(file => {
      const ext = path.extname(file);
      if (ext !== '.ts' && ext !== '.tsx') {
        return true;
      }
    })
    .filter(file => path.basename(file) !== 'tsconfig.json')
    .map(file => {
      fs.copySync(
        joinWithRootPath(file),
        joinWithRootPath(file.replace(input, outputPrefix)),
      );
    });

// if only tsx, compile them to jsx with tsc
// then compile them to es5 with babel
// for using babel plugins like babel-import
export const compile = async (program: any) => {
  const entry = program.entry || 'src';
  const output = program.output || 'lib';
  const outputEs = program.outputEs || 'es';

  if (process.env.RUN_ENV === 'test') {
    const tscOutput = 'dist/test-cases';
    const cleanPaths = [output, outputEs, tscOutput];
    for (const item of cleanPaths) {
      const target = joinWithRootPath(item);
      if (fs.existsSync(target)) {
        fs.emptyDirSync(target);
      }
    }
    trace(`少女边清理着名为 ${output} 的钱箱，边回顾着即将结束的一年单身生活
...顺带感慨了下自己又一年一平如洗的身板`);

    const tscBin = require.resolve('typescript/bin/tsc');
    await new Promise(resolve => {
      runCmd('node', [tscBin, '-p', entry], resolve);
    });
    copyRestFilesToTsc(entry, tscOutput);

    const es6Files = walk(joinWithRootPath(tscOutput));
    compileJSX(es6Files, tscOutput, output, 'es2015');
    compileJSX(es6Files, tscOutput, outputEs, 'es2015+');
    info('少女换上了新的钱箱，开始了一年新的单身生活');
  }
};
