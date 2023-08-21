import { useCallback } from 'react';

const useErrorHandler = () => {
  const handle = useCallback((err: any) => {
    if (err?.response?.data?.message === 'LOGIN_ERROR') {
      alert('로그인에 실패했습니다.');
      return;
    }

    alert('문제가 생겼습니다!\n새로고침 후 다시 시도해주세요!');
    // 원치않는 에러가 발생한 경우입니다. production 버전 이후에 해당 에러들을 따로 보관하고 싶다면 server에 데이터를 보내주세요!
  }, []);

  return handle;
};

export default useErrorHandler;
