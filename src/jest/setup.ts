import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Enzyme from 'enzyme';
import Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });
