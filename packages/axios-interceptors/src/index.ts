import axios from 'axios';

export function createApiWithInterceptors(baseURL: string = '') {
  const api = axios.create({ baseURL });

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      // You can modify the config here, e.g., add auth token
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle errors globally, e.g., redirect to login on 401
      if (error.response?.status === 401) {
        // Example: redirect to login page
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return api;
}