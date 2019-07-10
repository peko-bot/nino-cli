import webpack from 'webpack';
import { getDefaultConfig } from './handler';
import TscWatchClient from 'tsc-watch/client';
const watcher = new TscWatchClient();

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
  const { watch } = program;

  if (watch) {
    watcher.on('first_success', () => {
      runWebpackDevServer(program);
    });
    watcher.start();
  } else {
    runWebpackDevServer(program);
  }
};
