import { userAuthActionType } from './action';

export type userAuthInitStateType = {
  user_idx: string;
  user_token: string;
};

const initialState = {
  user_idx: '',
  user_token: '',
};
const userAuthReducer = (state = initialState, action: userAuthActionType) => {
  switch (action.type) {
    case 'SAVE_USER_IDX':
      return {
        ...state,
        user_idx: action.payload,
      };

    default:
      return state;
  }
};

export default userAuthReducer;
