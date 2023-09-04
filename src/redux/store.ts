import { createStore } from 'redux';
import subscriberReducer from './subscriber/reducer';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

// const middleware = [logger, thunk];
const middleware = [thunk];

const store = createStore(
  rootReducer,
  // composeWithDevTools(),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
