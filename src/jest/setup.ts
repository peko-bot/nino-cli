import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const g = global as any;
g.requestAnimationFrame =
  g.requestAnimationFrame ||
  function requestAnimationFrame(callback: Function) {
    setTimeout(callback, 0);
  };

Enzyme.configure({ adapter: new Adapter() });
