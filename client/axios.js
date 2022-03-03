import Axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authRequestInterceptor(config) {
  const token = localStorage.getItem('auth-token');
  config.params = undefined;
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.errors ||
      error.response?.data?.message ||
      error.message;
    if (error?.response?.status === 401) {
      // toast.error(message);
      return Promise.reject({
        ...error,
        message,
        redirect: {
          permanent: false,
          destination: '/auth/signin',
        },
      });
    } else {
      // toast.error(message);
      return Promise.reject(error);
    }
  }
);

export const axiosPost = (url, data, headers) =>
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data, headers);
