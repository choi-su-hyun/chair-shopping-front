import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export function setInterceptor(instance: AxiosInstance) {
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(
    function (config) {
      // 요청이 전달되기 전에 작업 수행
      // console.log(config);
      return config;
    },
    function (error: AxiosError) {
      // 요청 오류가 있는 작업 수행
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 데이터가 있는 작업 수행
      return response;
    },
    function (error: AxiosError) {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 오류가 있는 작업 수행
      return Promise.reject(error);
    },
  );
  return instance;
}
