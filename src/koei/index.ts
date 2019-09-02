import webpack from 'webpack';
import { getDefaultConfig } from './handler';

const runWebpackDevServer = (program: any) => {
  const { watch } = program;
  const { webpackConfig } = getDefaultConfig(program);
  if (watch) {
    webpack(webpackConfig).watch({}, () => {});
  } else {
    webpack(webpackConfig).run(() => {});
  }
};

export const koei = (program: any) => {
  runWebpackDevServer(program);
};
