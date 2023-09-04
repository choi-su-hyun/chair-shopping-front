import { instance, post } from './index';
import { ISignupData } from '../types/user';
import { ILoginData, ILoginAxiosResult } from '../types/user';

//회원가입 api
async function registerUser(userData: ISignupData) {
  try {
    const requestData = await instance.post('users/signup-process', userData);
    return requestData;
  } catch (error) {
    console.log(error);
  }
}

//로그인 api
async function loginUser(userData: ILoginData): Promise<ILoginAxiosResult> {
  try {
    const loginResponsedData = await instance.post(
      'users/login-process',
      userData,
    );
    // console.log('data 값', loginResponsedData);
    const result = {
      successStatus: true,
      loginResponsedData: loginResponsedData,
    };
    return result;
  } catch (error: any) {
    if (error.response.data.message === 'ID_NOTHING') {
      const result = {
        successStatus: false,
        message: '존재하지 않는 아이디입니다.',
      };
      return result;
    }
    if (error.response.data.message === 'PASSWORD_NOT_MATCHED') {
      const result = {
        successStatus: false,
        message: '비밀번호가 일치하지 않습니다.',
      };
      return result;
    }
    return {
      successStatus: false,
      message: '에러 발생',
    };
  }
}

export { registerUser, loginUser };
