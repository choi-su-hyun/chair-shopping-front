import { combineReducers } from 'redux';
import viewReducer from './views/reducer';
import subscriberReducer from './subscriber/reducer';
import userAuthReducer from './userAuth/reducer';

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
  userAuth: userAuthReducer,
});

export default rootReducer;
