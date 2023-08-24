import { SAVE_STATUS } from './type';
import {
  ILoginData,
  ILoginWithTokenData,
  ILoginAxiosResult,
  ILoginInitState,
} from '../../types/user';
import { loginUser } from '../../api/user';
import { setCookie, getCookie } from '../../utils/cookie';
import { RootState } from '../../redux/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const changeUserData = (loginHasTokenData: ILoginInitState) => {
  return {
    type: SAVE_STATUS,
    payload: loginHasTokenData,
  };
};

export const fetchUserData = (userData: ILoginData) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const result: ILoginAxiosResult = await loginUser(userData);
    console.log('result 값', result);
    if (result.successStatus) {
      const loginHasTokenData = {
        user_name: result.loginResponsedData?.data.nickName,
        user_token: result.loginResponsedData?.data.token,
        user_message: result.loginResponsedData?.data.message,
      };
      setCookie('user_name', loginHasTokenData.user_name);
      setCookie('user_token', loginHasTokenData.user_token);

      // console.log('loginHasTokenData 값', loginHasTokenData);
      dispatch(changeUserData(loginHasTokenData));
    }
    const loginFailData = {
      user_name: '',
      user_token: '',
      user_message: result.message,
    };
    dispatch(changeUserData(loginFailData));
  };
};

export const recieveCookieUserData = () => {
  return (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const loginHasTokenData = {
      user_name: getCookie('user_name'),
      user_token: getCookie('user_token'),
      user_message: '',
    };
    // console.log('쿠키 값 나왔는지 확인', loginHasTokenData);

    dispatch(changeUserData(loginHasTokenData));
  };
};
