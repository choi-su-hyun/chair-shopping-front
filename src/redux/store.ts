import { createStore } from 'redux';
import subscriberReducer from './subscriber/reducer';

const store = createStore(subscriberReducer);

export default store;
