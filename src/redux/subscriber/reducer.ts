import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from './type';
import { actionType } from './action';

export type initStateType = {
  count: number;
};

const initState: initStateType = {
  count: 370,
};
const subscriberReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      console.log('subscriber로 확인');
      return {
        ...state,
        count: state.count + 1,
      };
    case REMOVE_SUBSCRIBER:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default subscriberReducer;
