import { SAVE_USER_IDX } from './type';
import { loginHasTokenDataType } from '../../components/posts/LoginForm';

export type userAuthActionType = {
  type: string;
  payload: loginHasTokenDataType;
};

export const changeUserData = (loginHasTokenData: loginHasTokenDataType) => {
  console.log('action 확인중', loginHasTokenData);
  return {
    type: SAVE_USER_IDX,
    payload: loginHasTokenData,
  };
};
