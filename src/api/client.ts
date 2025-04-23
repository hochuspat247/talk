// src/api/client.ts
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken, initializeAuth } from './auth';
import client from './axiosInstance';

// Перехватчик для запросов
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик для ответов
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { access_token, expires_in } = await refreshToken();
        await AsyncStorage.setItem('token', access_token);
        const expirationTime = Date.now() + (expires_in || 3600) * 1000;
        await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
        originalRequest.headers.set('Authorization', `Bearer ${access_token}`);
        return client(originalRequest);
      } catch (refreshError) {
        if (refreshError?.message === 'Invalid refresh token') {
          await AsyncStorage.clear();
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Экспортируем функцию для инициализации
export const setupAuth = async (): Promise<string | null> => {
  return await initializeAuth();
};

export default client;