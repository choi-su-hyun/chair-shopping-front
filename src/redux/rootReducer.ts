import { combineReducers } from 'redux';
import viewReducer from './views/reducer';
import subscriberReducer from './subscriber/reducer';
import userAuthReducer from './userAuth/reducer';
import adminReducer from './adminAuth/reducer';

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
  userAuth: userAuthReducer,
  adminAuth: adminReducer,
});

export default rootReducer;
