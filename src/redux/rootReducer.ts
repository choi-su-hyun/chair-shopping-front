import { combineReducers } from 'redux';
import viewReducer from './views/reducer';
import subscriberReducer from './subscriber/reducer';
import userAuthReducer from './userAuth/reducer';
import adminReducer from './adminAuth/reducer';
import popupReducer from './alertPopup/reducer';

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
  userAuth: userAuthReducer,
  adminAuth: adminReducer,
  popup: popupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
