import { transformSync } from '@babel/core';
import fs from 'fs-extra';
import path from 'path';
import { injectRequire } from '../babel/projectHelper';
import { getBabelConfig } from '../babel/babelCommonConfig';
import { joinWithRootPath, walkSync, runCmd } from '../utils/common';
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
      const result = transformSync(fileContent, {
        sourceMaps: 'inline',
        ...getBabelConfig(target === 'es2015+'),
      });
      if (result) {
        fs.outputFileSync(outputPath.replace('.jsx', '.js'), result.code);
      }
    } else if (!file.endsWith('.map')) {
      fs.copySync(file, outputPath);
    }
  }
};

const copyRestFilesToTsc = async (input: string, outputPrefix: string) => {
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
        fs.copySync(
          joinWithRootPath(file),
          joinWithRootPath(file.replace(input, outputPrefix)),
        );
      }
    });
};

// if only tsx, compile them to jsx with tsc
// then compile them to es5 with babel
// for using babel plugins like babel-import
export const compile = async (program: any, callback?: () => void) => {
  const entry = program.entry || 'src';
  const libOutput = program.libOutput || 'lib';
  const esOutput = program.esOutput || 'es';
  const isTestEnv = process.env.RUN_ENV === 'test';

  let tscOutputPath = 'dist';
  if (fs.existsSync(joinWithRootPath('tsconfig.json')) && !tscOutputPath) {
    const tsconfigFile = require(joinWithRootPath('tsconfig.json'));
    tscOutputPath = tsconfigFile.compilerOptions.outDir;
  }

  const tscOutput = isTestEnv ? 'dist/test-cases' : tscOutputPath;
  const cleanPaths = [libOutput, esOutput, tscOutput];
  for (const item of cleanPaths) {
    const target = joinWithRootPath(item);
    if (fs.existsSync(target)) {
      fs.emptyDirSync(target);
    }
  }
  trace(
    `少女边清理着名为 ${libOutput}/${esOutput} 的钱箱，边回顾着即将结束的一年单身生活`,
  );
  setTimeout(() => {
    trace(`...顺带感慨了下自己又一年一平如洗的身板`);
  }, 2000);

  await new Promise(resolve => {
    const tscBin = require.resolve('typescript/bin/tsc');
    if (isTestEnv) {
      runCmd('node', [tscBin, '-p', entry], resolve);
    } else {
      runCmd('node', [tscBin], resolve);
    }
  });

  await copyRestFilesToTsc(entry, tscOutput);
  const tscOutputFiles: any = await walkSync(joinWithRootPath(tscOutput));
  compileJSX(tscOutputFiles, tscOutput, libOutput, 'es2015');
  compileJSX(tscOutputFiles, tscOutput, esOutput, 'es2015+');
  info('少女换上了新的钱箱，开始了一年新的单身生活');
  if (callback) {
    callback();
  }
};
