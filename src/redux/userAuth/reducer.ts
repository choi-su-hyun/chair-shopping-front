import { SAVE_STATUS } from './type';
import {
  ILoginWithTokenData,
  ILoginAction,
  ILoginInitState,
} from '../../types/user';

const initialState: ILoginInitState = {
  user_name: '',
  user_token: '',
  user_refreshToken: '',
  user_message: '',
};
const userAuthReducer = (state = initialState, action: ILoginAction) => {
  switch (action.type) {
    case SAVE_STATUS:
      // console.log('reducer 보자');
      return {
        ...state,
        user_name: action.payload.user_name,
        user_token: action.payload.user_token,
        user_refreshToken: action.payload.user_refreshToken,
        user_message: action.payload.user_message,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
