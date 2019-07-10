import { createTransformer } from 'ts-jest';
import fs from 'fs-extra';
import { joinWithRootPath } from '../utils/common';

const testTsConfigPath = joinWithRootPath('tsconfig.test.json');
const tsTestConfigPath = fs.existsSync(testTsConfigPath)
  ? testTsConfigPath
  : joinWithRootPath('tsconfig.json');
const tsJest = createTransformer({
  tsConfig: tsTestConfigPath,
});

module.exports = {
  process(src: any, filePath: string) {
    src = tsJest.process(src, filePath, {
      moduleFileExtensions: ['ts', 'tsx'],
    } as any);
    return src;
  },
};
