import { userAuthActionType } from './action';
import { SAVE_USER_IDX } from './type';

export type userAuthInitStateType = {
  user_name: string;
  user_token: string;
};

const initialState = {
  user_name: '',
  user_token: '',
};
const userAuthReducer = (state = initialState, action: userAuthActionType) => {
  switch (action.type) {
    case SAVE_USER_IDX:
      console.log('reducer 확인중');
      return {
        ...state,
        user_name: '이거 왜 안될까?',
        // user_token: action.payload.user_token,
      };

    default:
      return state;
  }
};

export default userAuthReducer;
