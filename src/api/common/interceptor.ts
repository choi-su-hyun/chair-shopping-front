import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';
import { getCookie, setCookie, removeCookie } from '../../utils/reactCookie';

export function setInterceptor(instance: AxiosInstance): AxiosInstance {
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(
    function (config) {
      // 요청이 전달되기 전에 작업 수행
      // console.log(config);
      const tokenValue = getCookie('user_token');
      const refreshTokenValue = getCookie('user_refreshToken');
      const adminTokenValue = getCookie('admin_token');
      const adminRefreshTokenValue = getCookie('admin_refreshToken');
      if (refreshTokenValue !== undefined) {
        config.headers.authorization = tokenValue;
        config.headers.refresh = refreshTokenValue;
      }
      if (adminRefreshTokenValue !== undefined) {
        config.headers.authorization = adminTokenValue;
        config.headers.refresh = adminRefreshTokenValue;
      }

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
    async function (error: AxiosError) {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 오류가 있는 작업 수행
      const originalRequest = error.config;
      const data: any = error.response?.data;
      const status = error.response?.status;
      const isUser = getCookie('user_refreshToken');
      const isAdmin = getCookie('admin_refreshToken');
      const guideReLogin = () => {
        if (isUser) {
          alert('로그인 시간이 만료되었습니다.');
          removeCookie('user_name', { path: '/' });
          removeCookie('user_token', { path: '/' });
          removeCookie('user_refreshToken', { path: '/' });
          window.location.href = '/login';
        }
        if (isAdmin) {
          alert('로그인 시간이 만료되었습니다.');
          removeCookie('admin_name', { path: '/' });
          removeCookie('admin_token', { path: '/' });
          removeCookie('admin_refreshToken', { path: '/' });
          // window.location.href = '/admin';
        }
      };

      if (status == 401) {
        console.log('401에러 발생');
        if (isUser !== undefined) {
          console.log('user 로그인 상태임');
          if (data.message == 'expired token') {
            await instance
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
              .then(async (response) => {
                console.log(
                  '인터셉터의 에러 발생 후 토큰 확인을 위한 response',
                  response,
                );
                var date = new Date();
                date.setMinutes(date.getMinutes() + 60);
                var dateForRefresh = new Date();
                dateForRefresh.setDate(dateForRefresh.getDate() + 14);
                setCookie('user_token', response.data.contents.accessToken, {
                  path: '/',
                  expires: date,
                });
                setCookie(
                  'user_refreshToken',
                  response.data.contents.refreshToken,
                  {
                    path: '/',
                    expires: dateForRefresh,
                  },
                );
                if (originalRequest !== undefined && originalRequest !== null) {
                  originalRequest.headers['authorization'] =
                    response.data.contents.accessToken;
                  originalRequest.headers['refresh'] =
                    response.data.contents.refreshToken;
                }
              })
              .catch((error) => {
                console.log('interceptor error', error);
                // guideReLogin();
              });
            if (originalRequest !== undefined && originalRequest !== null) {
              return await axios(originalRequest);
            }
            // if (originalRequest != undefined) {
            //   return axios(originalRequest).then((res) =>
            //     console.log('재발급된 토큰을 전달한 api의 response 값 확인', res),
            //   );
            // }
          } else if (
            // data.message == 'All token is not include' ||
            data.message == 'Expired/invalid all token' ||
            data.message == 'token is not included' ||
            data.message == 'invalid token'
          ) {
            guideReLogin();
          } else if (data.message == 'Access token is valid') {
            window.location.reload();
          }
        } else if (isAdmin !== undefined) {
          console.log('admin 로그인 상태임');
          if (data.message == 'expired token') {
            await instance
              .post(
                '/refresh',
                {},
                {
                  headers: {
                    authorization: getCookie('admin_token'),
                    refresh: getCookie('admin_refreshToken'),
                  },
                },
              )
              .then(async (response) => {
                console.log(
                  '인터셉터의 에러 발생 후 토큰 확인을 위한 response',
                  response,
                );
                var date = new Date();
                date.setMinutes(date.getMinutes() + 60);
                var dateForRefresh = new Date();
                dateForRefresh.setDate(dateForRefresh.getDate() + 14);
                setCookie('admin_token', response.data.contents.accessToken, {
                  path: '/',
                  expires: date,
                });
                setCookie(
                  'admin_refreshToken',
                  response.data.contents.refreshToken,
                  {
                    path: '/',
                    expires: dateForRefresh,
                  },
                );
                if (originalRequest !== undefined && originalRequest !== null) {
                  originalRequest.headers['authorization'] =
                    response.data.contents.accessToken;
                  originalRequest.headers['refresh'] =
                    response.data.contents.refreshToken;
                }
              })
              .catch((error) => {
                console.log('interceptor error', error);
                // guideReLogin();
              });
            if (originalRequest !== undefined && originalRequest !== null) {
              return await axios(originalRequest);
            }
          } else if (
            data.message == 'Expired/invalid all token' ||
            data.message == 'token is not included' ||
            data.message == 'invalid token'
          ) {
            guideReLogin();
          } else if (data.message == 'Access token is valid') {
            window.location.reload();
          }
        }
        console.log('조건문 실행 안함');
      }
      return Promise.reject(error);
    },
  );
  return instance;
}
