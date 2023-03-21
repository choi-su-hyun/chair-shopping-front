import { createStore } from 'redux';
import subscriberReducer from './subscriber/reducer';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

export default store;
