import { SAVE_STATUS } from './type';
import { loginHasTokenDataType } from '../../components/posts/LoginForm';
import { loginDataType } from '../../components/posts/LoginForm';
import { loginUser } from '../../api/user';
import { setCookie, getCookie } from '../../utils/cookie';

export type userAuthActionType = {
  type: string;
  payload: loginHasTokenDataType;
};

// export const changeUserData = (loginHasTokenData: loginHasTokenDataType) => {
//   console.log('action 확인중', loginHasTokenData);
//   return {
//     type: SAVE_STATUS,
//     payload: loginHasTokenData,
//   };
// };

const changeUserData = (loginHasTokenData: any) => {
  return {
    type: SAVE_STATUS,
    payload: loginHasTokenData,
  };
};

// export const fetchUserData = (userData: any) => {
//   return (dispatch: any) => {
//     loginUser(userData).then((response) => {
//       console.log(response);
//     });
//     // dispatch(changeUserData(loginHasTokenData));
//   };
// };
export const fetchUserData = (userData: loginDataType) => {
  return async (dispatch: any) => {
    const result: any = await loginUser(userData);
    console.log('result 값', result);
    const loginHasTokenData = {
      user_name: result.loginResponsedData.data.nickName,
      user_token: result.loginResponsedData.data.token,
    };
    setCookie('user_name', loginHasTokenData.user_name);
    setCookie('user_token', loginHasTokenData.user_token);

    console.log('loginHasTokenData 값', loginHasTokenData);
    dispatch(changeUserData(loginHasTokenData));
  };
};

export const saveCookieData = () => {
  return (dispatch: any) => {
    const loginHasTokenData = {
      user_name: getCookie('user_name'),
      user_token: getCookie('user_token'),
    };
    console.log('쿠키 값 나왔는지 확인', loginHasTokenData);

    dispatch(changeUserData(loginHasTokenData));
  };
};
