import webpack from 'webpack';
import { getDefaultConfig } from './handler';
import TscWatchClient from 'tsc-watch/client';
const watcher = new TscWatchClient();

const runWebpackDevServer = (program: any) => {
  const watch = program.watch;
  const { webpackConfig } = getDefaultConfig(program);
  if (watch) {
    webpack(webpackConfig).watch({}, () => {});
  } else {
    webpack(webpackConfig).run(() => {});
  }
};

export const koei = (program: any) => {
  watcher.on('first_success', () => {
    runWebpackDevServer(program);
  });
  watcher.start();
};
