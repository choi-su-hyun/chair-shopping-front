import { instance, post } from './index';
import { loginDataType } from '../components/posts/LoginForm';

interface CustomError extends Error {
  // name: string;
  // message: string;
  // stack?: string; - Error 인터페이스 프로퍼티들을 직접 쓰거나 아니면 상속해준다.

  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

//category 리스트 받기
const getCategoryData = async () => {
  return await instance.get('admin/category-data');
};
//category 생성 요청
const createCategory = async () => {
  return await instance.post('admin/category-create-process');
};

//admin 로그인 요청
async function loginAdmin(userData: loginDataType) {
  try {
    const loginResponsedData = await instance.post(
      'admin/admin-login-process',
      userData,
    );
    console.log('data 값', loginResponsedData);
    const result = {
      successStatus: true,
      loginResponsedData: loginResponsedData,
    };
    return result;
  } catch (error: unknown) {
    const customErr = error as CustomError;
    if (customErr.response?.data.message === 'ID_NOTHING') {
      const result = {
        successStatus: false,
        message: '존재하지 않는 아이디입니다.',
      };
      return result;
    }
    if (customErr.response?.data.message === 'PASSWORD_NOT_MATCHED') {
      const result = {
        successStatus: false,
        message: '비밀번호가 일치하지 않습니다.',
      };
      return result;
    }
  }
}

export { getCategoryData, createCategory, loginAdmin };
