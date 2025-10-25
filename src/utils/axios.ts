import axios from 'axios';
import { API_URL as ENV_API_URL } from '@env';
import { store } from '@/store/store';
import { logout } from '@/store/slices/auth.slice';

export const API_URL = ENV_API_URL;
const API = axios.create({
  baseURL: API_URL,
  // timeout: 10000,
});

API.interceptors.request.use(
  async config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      '🔵[Request]',
      JSON.stringify(
        {
          url: `${config.baseURL}${config.url}`,
          method: config.method,
          params: config.params,
          data: config.data,
          headers: config.headers,
        },
        null,
        2,
      ),
    );

    return config;
  },
  error => {
    console.log('❌[Request Error]', JSON.stringify(error, null, 2));
    return Promise.reject(error);
  },
);

// Response interceptor
API.interceptors.response.use(
  response => {
    // ✅ Log successful response
    console.log(
      '✅[Response]',
      JSON.stringify(
        {
          url: response.config.url,
          status: response.status,
          data: response.data,
        },
        null,
        2,
      ),
    );

    return response.data;
  },
  async error => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.log('🔐 Unauthorized: Token may be expired or invalid.');
        store.dispatch(logout());
      }

      console.log(
        '❌[Response Error]',
        JSON.stringify(
          {
            url: error.config.url,
            method: error.config.method,
            params: error.config.params,
            data: error.config.data,
            status,
            responseData: error.response.data,
          },
          null,
          2,
        ),
      );
    } else {
      console.log('❌[Unknown Axios Error]\n', JSON.stringify(error, null, 2));
    }
    return Promise.reject(error?.response?.data);
  },
);

export default API;
