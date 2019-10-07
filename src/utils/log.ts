import chalk, { Chalk } from 'chalk';
import { format } from 'date-fns';

export const getTimestamp = () =>
  `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] `;
const logger = (colorFunc: Chalk, prefix: string, content: string) => {
  const message = prefix + content;
  // eslint-disable-next-line no-console
  console.log(colorFunc(message));
};

export const success = (text: string) =>
  logger(chalk.greenBright, 'success => ', text);

export const error = (text: string) => logger(chalk.red, '', text);

export const info = (text: string) => logger(chalk.yellowBright, '', text);

export const trace = (text: string) => logger(chalk.cyanBright, '', text);
