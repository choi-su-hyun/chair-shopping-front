import { combineReducers } from 'redux';
import viewReducer from './views/reducer';
import subscriberReducer from './subscriber/reducer';

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
});

export default rootReducer;
