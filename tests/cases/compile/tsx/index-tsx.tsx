import { format } from 'date-fns';
import { calc } from './src/calc-tsx';

const defaultFunc = (prefix: string) => {
  // tslint:disable-next-line: no-console
  console.log(`${prefix}: ${format(new Date(), 'yyyy-MM-dd hh:mm:ss')}`); // eslint-disable-line
  // tslint:disable-next-line: no-console
  console.log(calc()); // eslint-disable-line
};

defaultFunc('timeStamp:');
