import exp from 'constants';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export const setCookie = (name: string, value: string, options: {}) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option: {}) => {
  return cookies.remove(name, option);
};
