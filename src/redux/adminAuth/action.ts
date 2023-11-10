import { SAVE_ADMIN_STATUS } from './type';

import { loginAdmin } from '../../api/admin';
import { setCookie, getCookie, removeCookie } from '../../utils/reactCookie';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../redux/rootReducer';
import {
  IAdminLoginAxiosResult,
  IAdminInitState,
  IAdminLoginData,
} from '../../types/administrator';

const saveAdminData = (adminLoginData: IAdminInitState) => {
  return {
    type: SAVE_ADMIN_STATUS,
    payload: adminLoginData,
  };
};

export const fetchAdminData = (administratorData: IAdminLoginData) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const result: IAdminLoginAxiosResult = await loginAdmin(administratorData);
    console.log('result 값', result);
    console.log('result.message 값', result.message);
    if (result.successStatus) {
      const adminLoginData = {
        // admin_id: result.loginResponsedData?.data.adminId,
        admin_token: result.loginResponsedData?.data.token,
        admin_refreshToken: result.loginResponsedData?.data.refreshToken,
        admin_message: result.loginResponsedData?.data.message,
      };
      var date = new Date();
      date.setMinutes(date.getMinutes() + 60);
      var dateForRefresh = new Date();
      dateForRefresh.setDate(dateForRefresh.getDate() + 14);
      if (getCookie('user_refreshToken') !== undefined) {
        // removeCookie('user_name', { path: '/' });
        removeCookie('user_token', { path: '/' });
        removeCookie('user_refreshToken', { path: '/' });
      }
      // setCookie('admin_nickname', adminLoginData.admin_id, {
      //   path: '/',
      //   expires: date,
      // });
      setCookie('admin_token', adminLoginData.admin_token, {
        path: '/',
        expires: date,
      });
      setCookie('admin_refreshToken', adminLoginData.admin_refreshToken, {
        path: '/',
        expires: dateForRefresh,
      });
      dispatch(saveAdminData(adminLoginData));
    } else {
      const adminLoginData: IAdminInitState = {
        admin_token: '',
        admin_refreshToken: '',
        admin_message: result.message,
      };
      dispatch(saveAdminData(adminLoginData));
    }
  };
};

export const recieveCookieAdminData = () => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const cookieData: IAdminInitState = {
      admin_token: getCookie('admin_token') || '',
      admin_refreshToken: getCookie('admin_refreshToken') || '',
      admin_message: '',
    };
    dispatch(saveAdminData(cookieData));
  };
};
