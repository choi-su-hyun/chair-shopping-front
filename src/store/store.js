// import { createStore } from 'redux';
const redux = require('redux');
const createStore = redux.createStore;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const combineReducers = redux.combineReducers;

//view Reducer
//action
const ADD_VIEW = 'ADD_VIEW';
const addView = () => {
  return {
    type: ADD_VIEW,
  };
};

//reducer
const viewState = {
  views: 30,
};
const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case ADD_VIEW:
      return {
        ...state,
        views: state.views + 1,
      };
    default:
      return state;
  }
};

//subscriber Reducer
//action
// type actionType = {
//   type: string;
// };
const ADD_SUBSCRIBER = 'ADD_SUBSCRIBER';
const addSubscriber = () => {
  return {
    type: ADD_SUBSCRIBER,
  };
};

//reducer
const subscriberState = {
  subscribers: 365,
};
const subscriberReducer = (state = subscriberState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      return {
        ...state,
        subscribers: state.subscribers + 1,
      };
    default:
      return state;
  }
};

//rootReducer
const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
});

//store
const store = createStore(rootReducer, applyMiddleware(logger));

// store.subscribe(() => {
//   console.log('state:', store.getState());
// });
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addView());
store.dispatch(addView());
store.dispatch(addView());
