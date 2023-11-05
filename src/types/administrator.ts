import { AxiosResponse } from 'axios';

interface IAdminLoginData {
  [key: string]: string;
}
interface IAdminInitState {
  admin_id: string | undefined;
  admin_token: string | undefined;
  admin_refreshToken: string | undefined;
  admin_message: string | undefined;
}
interface IAdminFailMessageState {
  admin_message: string | undefined;
}
interface IAdminAction {
  type: string;
  payload: IAdminInitState;
}
interface IAdminLoginCookie {
  admin_id: string | undefined;
  admin_token: string | undefined;
}

interface IAdminLoginAxiosResult {
  adminId?: string | undefined;
  message?: string | undefined;
  token?: string | undefined;
  successStatus: boolean;
  loginResponsedData?: AxiosResponse<any, any> | undefined;
}

interface IStateAndDispatchInProps {
  admin_id: string | undefined;
  admin_token: string | undefined;
  admin_message: string | undefined;
  fetchAdminData: (adminData: IAdminLoginData) => Promise<void>;
}

export type {
  IAdminInitState,
  IAdminFailMessageState,
  IAdminAction,
  IAdminLoginCookie,
  IAdminLoginData,
  IAdminLoginAxiosResult,
  IStateAndDispatchInProps,
};
