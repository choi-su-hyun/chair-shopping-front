import { AxiosResponse } from 'axios';

interface ILoginData {
  [key: string]: string;
}
interface ILoginAction {
  type: string;
  payload: ILoginInitState;
}
interface ILoginInitState {
  user_name: string | undefined;
  user_token: string | undefined;
  user_refreshToken: string | undefined;
  user_message: string | undefined;
}
interface ILoginAxiosResult {
  successStatus: boolean;
  loginResponsedData?: AxiosResponse<any, any>;
  message?: string;
}
interface IStateAndDispatchInProps {
  user_name: string | undefined;
  user_token: string | undefined;
  user_message: string | undefined;
  fetchUserData: (userData: ILoginData) => Promise<void>;
}
interface ISignupData {
  user_id: string;
  user_password: string;
  user_name: string;
  user_email: string;
  user_phone: string;
}

export type {
  ILoginData,
  ILoginAction,
  ILoginInitState,
  ILoginAxiosResult,
  IStateAndDispatchInProps,
  ISignupData,
};
