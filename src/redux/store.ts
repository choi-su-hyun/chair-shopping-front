import { createStore } from 'redux';
import subscriberReducer from './subscriber/reducer';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { applyMiddleware } from 'redux';

const middleware = [logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
