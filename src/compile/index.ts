import { transformSync } from '@babel/core';
import fs from 'fs-extra';
import path from 'path';
import { injectRequire } from '../babel/projectHelper';
import { getBabelConfig } from '../babel/babelCommonConfig';
import { joinWithRootPath, walk } from '../utils/common';
import { info, trace } from '../utils/log';
injectRequire();

const compileJSX = (
  files: string[],
  entry: string,
  output: string,
  outputEs: string,
) => {
  for (const file of files) {
    const fileName = path.basename(file);
    const outputEsPath = file.replace(entry, outputEs).replace('jsx', 'js');
    if (file.endsWith('js') || file.endsWith('jsx')) {
      const fileContent = fs.readFileSync(file, 'utf8');
      let result = transformSync(fileContent, getBabelConfig());
      if (result) {
        fs.outputFileSync(joinWithRootPath([output, fileName]), result.code);
      }
      result = transformSync(fileContent, getBabelConfig(true));
      if (result) {
        fs.outputFileSync(joinWithRootPath([outputEs, fileName]), result.code);
      }
    } else if (!(file.endsWith('jsx') || file.endsWith('js'))) {
      fs.copySync(file, output);
      fs.copySync(file, outputEsPath);
    }
  }
  info('少女换上了新的钱箱，开始了一年新的单身生活');
};

// if only tsx, compile them to jsx with tsc
// then compile them to es5 with babel
// for using babel plugins like babel-import
export const compile = (program: any) => {
  const entry = program.entry || 'src';
  const output = program.output || 'lib';
  const outputEs = program.outputEs || 'es';

  if (fs.existsSync(joinWithRootPath(output))) {
    fs.emptyDirSync(joinWithRootPath(output));
  }
  if (fs.existsSync(joinWithRootPath(outputEs))) {
    fs.emptyDirSync(joinWithRootPath(outputEs));
  }
  trace(`少女边清理名为 ${output} 的钱箱，边回顾着即将结束的一年单身生活

...顺带感慨了下自己一平如洗的身板
        `);

  const entryPath = joinWithRootPath(program.entry || 'src');
  const files = walk(entryPath).filter(
    f =>
      f.endsWith('ts') ||
      f.endsWith('tsx') ||
      f.endsWith('js') ||
      f.endsWith('jsx'),
  );
  const tsxFiles = files.filter(f => f.endsWith('ts') || f.endsWith('tsx'));
  const jsxFiles = files.filter(f => f.endsWith('js') || f.endsWith('jsx'));
  let isTsx;
  if (tsxFiles.length > 0 && jsxFiles.length === 0) {
    isTsx = true;
  }
  // compile
  if (isTsx) {
    const prefix = 'dist/test-cases';
    const testCasesPaths = fs.readdirSync(joinWithRootPath(prefix));
    const fullTestCasesDir = [];
    for (const url of testCasesPaths) {
      fullTestCasesDir.push(joinWithRootPath([prefix, url]));
    }
    compileJSX(fullTestCasesDir, entry, output, outputEs);
    // if (process.env.RUN_ENV === 'test') {
    // } else {
    //   const tscBin = require.resolve('typescript/bin/tsc');
    //   const args = [];
    //   args.push(tscBin);
    //   runCmd('node', args, () => {
    //     compileJSX(tsxFiles, entry, output, outputEs);
    //   });
    // }
  } else {
    compileJSX(tsxFiles, entry, output, outputEs);
  }
};
