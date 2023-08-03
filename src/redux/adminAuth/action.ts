import { SAVE_ADMIN_STATUS } from './type';

import { loginHasTokenDataType } from '../../components/posts/LoginForm';
import { loginDataType } from '../../components/posts/LoginForm';
import { loginAdmin } from '../../api/admin';
import { setCookie, getCookie } from '../../utils/cookie';

//type
export type adminLoginResponseDataType = {
  admin_id: string | undefined;
  admin_token: string | undefined;
  admin_message: string | undefined;
};

export type adminLoginCookieType = {
  admin_id: string | undefined;
  admin_token: string | undefined;
};

export type adminActionType = {
  type: string;
  payload: adminLoginResponseDataType;
};

//action
const saveAdminData = (adminLoginData: adminLoginResponseDataType) => {
  return {
    type: SAVE_ADMIN_STATUS,
    payload: adminLoginData,
  };
};

export const fetchAdminData = (administratorData: loginDataType) => {
  return async (dispatch: any) => {
    const result: any = await loginAdmin(administratorData);
    console.log('result 값', result);
    console.log('result.message 값', result.message);
    if (result.successStatus) {
      const adminLoginData = {
        admin_id: result.loginResponsedData.data.adminId,
        admin_token: result.loginResponsedData.data.token,
        admin_message: result.message,
      };
      setCookie('admin_nickname', adminLoginData.admin_id);
      setCookie('admin_token', adminLoginData.admin_token);
      dispatch(saveAdminData(adminLoginData));
    } else {
      const adminLoginData: any = {
        admin_message: result.message,
      };
      dispatch(saveAdminData(adminLoginData));
    }
  };
};

export const recieveCookieAdminData = () => {
  return async (dispatch: any) => {
    const cookieData: adminLoginResponseDataType = {
      admin_id: getCookie('admin_nickname'),
      admin_token: getCookie('admin_token'),
      admin_message: '',
    };
    dispatch(saveAdminData(cookieData));
  };
};
