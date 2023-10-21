import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { getCookie, setCookie, removeCookie } from '../../utils/reactCookie';

export function setInterceptor(instance: AxiosInstance): AxiosInstance {
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(
    function (config) {
      // 요청이 전달되기 전에 작업 수행
      // console.log(config);
      const tokenValue = getCookie('user_token');
      const refreshTokenValue = getCookie('user_refreshToken');
      config.headers.authorization = tokenValue;
      config.headers.refresh = refreshTokenValue;

      console.log();
      return config;
    },
    function (error: AxiosError) {
      // 요청 오류가 있는 작업 수행
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    function (response: AxiosResponse): AxiosResponse {
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 데이터가 있는 작업 수행

      return response;
    },
    function (error: AxiosError) {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 오류가 있는 작업 수행
      const originalConfig = error.config;
      const data: any = error.response?.data;
      console.log('data', data);
      const status = error.response?.status;

      if (status == 401) {
        if (data.message == 'expired token') {
          instance
            .post(
              '/refresh',
              {},
              {
                headers: {
                  authorization: getCookie('user_token'),
                  refresh: getCookie('user_refreshToken'),
                },
              },
            )
            .then((response) => {
              console.log(
                '인터셉터의 에러 발생 후 토큰 확인을 위한 response',
                response,
              );
              var date = new Date();
              date.setMinutes(date.getMinutes() + 60);
              var dateForRefresh = new Date();
              dateForRefresh.setDate(dateForRefresh.getDate() + 14);
              setCookie('user_token', response.data.contents.accessToken, {
                expires: date,
              });
              setCookie(
                'user_refreshToken',
                response.data.contents.refreshToken,
                {
                  expires: dateForRefresh,
                },
              );
              window.location.reload();
            })
            .catch((error) => {
              console.log('interceptor error', error);
            });
        } else if (
          data.message == 'All token is not include' ||
          data.message == 'Expired/invalid all token' ||
          data.message == 'token is not included' ||
          data.message == 'invalid token'
        ) {
          window.location.href = '/login';
          removeCookie('user_name', { path: '/' });
          removeCookie('user_token', { path: '/' });
          removeCookie('user_refreshToken', { path: '/' });
        } else if (data.message == 'Access token is valid') {
          window.location.reload();
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
}
