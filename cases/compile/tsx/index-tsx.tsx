import { format } from 'date-fns';
import { calc } from './src/calc-tsx';

const defaultFunc = (prefix: string) => {
  console.log(`${prefix}: ${format(new Date(), 'yyyy-MM-dd hh:mm:ss')}`);
  console.log(calc());
};

defaultFunc('timeStamp:');
