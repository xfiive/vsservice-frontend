import axios from 'axios';

export default ({store, redirect}, inject) => {
  const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true,
  });

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await api.post('/admin/refresh');

          return api(originalRequest);
        } catch (refreshError) {
          await store.dispatch('logout');

          redirect('/login');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  inject('api', api);
};
