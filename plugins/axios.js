import axios from 'axios';

export default ({$axios, store, redirect}) => {
  const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true, // Включаем отправку cookies
  });

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Попытка обновить токен
          await api.post('/admin/refresh');
          // Повторяем запрос с обновленным токеном
          return api(originalRequest);
        } catch (refreshError) {
          // Если обновление не удалось, очищаем сессию и перенаправляем на страницу входа
          await store.dispatch('logout');
          redirect('/login');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // Добавляем API в контекст Nuxt.js
  $axios.defaults = api.defaults;
};
