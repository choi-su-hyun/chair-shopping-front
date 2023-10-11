import { SAVE_STATUS } from './type';
import {
  ILoginData,
  ILoginWithTokenData,
  ILoginAxiosResult,
  ILoginInitState,
} from '../../types/user';
import { loginUser } from '../../api/user';
import { RootState } from '../../redux/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getCookie, setCookie } from '../../utils/reactCookie';

const changeUserData = (loginHasTokenData: ILoginInitState) => {
  return {
    type: SAVE_STATUS,
    payload: loginHasTokenData,
  };
};

export const fetchUserData = (userData: ILoginData) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const result: ILoginAxiosResult = await loginUser(userData);
    // console.log('result 값', result);
    if (result.successStatus) {
      const loginHasTokenData = {
        user_name: result.loginResponsedData?.data.nickName,
        user_token: result.loginResponsedData?.data.token,
        user_message: result.loginResponsedData?.data.message,
      };
      var date = new Date();
      date.setMinutes(date.getMinutes() + 60);
      setCookie('user_name', loginHasTokenData.user_name, {
        path: '/',
        expires: date,
      });
      setCookie('user_token', loginHasTokenData.user_token, {
        path: '/',
        expires: date,
      });

      dispatch(changeUserData(loginHasTokenData));
    } else {
      const loginFailData = {
        user_name: '',
        user_token: '',
        user_message: result.message,
      };
      dispatch(changeUserData(loginFailData));
    }
  };
};

export const recieveCookieUserData = () => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const loginHasTokenData: ILoginInitState = {
      user_name: getCookie('user_name') || '',
      user_token: getCookie('user_token') || '',
      user_message: '',
    };
    // console.log('쿠키 값 나왔는지 확인', loginHasTokenData);

    dispatch(changeUserData(loginHasTokenData));
  };
};
