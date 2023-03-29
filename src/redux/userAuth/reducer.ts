import { SAVE_STATUS } from './type';
import { userAuthActionType } from './action';

export type userAuthInitStateType = {
  user_name: string;
  user_token: string;
};

const initialState: userAuthInitStateType = {
  user_name: '',
  user_token: '',
};
const userAuthReducer = (state = initialState, action: userAuthActionType) => {
  switch (action.type) {
    case SAVE_STATUS:
      console.log('reducer 보자');
      return {
        ...state,
        user_name: action.payload.user_name,
        user_token: action.payload.user_token,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
