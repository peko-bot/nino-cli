import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Enzyme from 'enzyme';
import Adapter = require('enzyme-adapter-react-16');

const g = global as any;
g.requestAnimationFrame =
  g.requestAnimationFrame ||
  function requestAnimationFrame(callback: Function) {
    setTimeout(callback, 0);
  };

Enzyme.configure({ adapter: new Adapter() });
