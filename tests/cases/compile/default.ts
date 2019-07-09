import { format } from 'date-fns';

const defaultFunc = (prefix: string) => {
  // tslint:disable-next-line: no-console
  console.log(`${prefix}: ${format(new Date(), 'yyyy-MM-dd hh:mm:ss')}`);
};

defaultFunc('timeStamp:');
