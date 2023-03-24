import { createStore } from 'redux';
import subscriberReducer from './subscriber/reducer';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
