import webpack, { Configuration } from 'webpack';
import { joinWithRootPath } from '../utils/common';
import { getResolves, getModules } from '../webpack/commonConfig';
import { error, info } from '../utils/log';

const handleStatus = (err: any, stats: any) => {
  if (err) {
    error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  const message = stats.toJson();
  if (stats.hasErrors()) {
    error(message.errors.toString());
  }
  if (stats.hasWarnings()) {
    info(message.warnings.toString());
  }
};

export const dist = ({ entry, output }: any) => {
  const commonConfig = {
    entry: joinWithRootPath(entry),
    resolve: getResolves(),
    module: getModules(),
    devtool: 'source-map',
  };
  webpack(
    {
      mode: 'production',
      output: {
        filename: require(joinWithRootPath('package.json')).name + '.min.js',
        path: joinWithRootPath(output),
      },
      ...commonConfig,
    } as Configuration,
    handleStatus,
  );
  webpack(
    {
      mode: 'development',
      output: {
        filename: require(joinWithRootPath('package.json')).name + '.js',
        path: joinWithRootPath(output),
      },
      ...commonConfig,
    } as Configuration,
    handleStatus,
  );
};
