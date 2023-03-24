import axios from 'axios';
import { setInterceptor } from './common/interceptor';

const createAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  return instance;
};

const createInterceptor = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  return setInterceptor(instance);
};

const instance = createAxios();
const post = createInterceptor();

export { instance, post };
