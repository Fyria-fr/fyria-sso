import { env } from '@/env';
import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (
    config.headers &&
    config.headers['Content-Type'] !== 'multipart/form-data'
  ) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL
});

export type GenericResponse<T = void> = {
  data: {
    message: string;
  } & (T extends void ? object : T);
};

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // redirect to login
    }

    return Promise.reject(error);
  }
);
