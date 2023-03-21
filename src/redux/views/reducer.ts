import { addViews } from './action';
import { actionType } from './action';

export type initStateType = {
  viewCount: number;
};

const initState = {
  viewCount: 30,
};
const viewReducer = (state: initStateType = initState, action: actionType) => {
  switch (action.type) {
    case 'ADD_VIEWS':
      return {
        ...state,
        viewCount: state.viewCount + action.payload,
      };
    default:
      return state;
  }
};

export default viewReducer;
