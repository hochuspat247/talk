import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from './auth';

// Базовый URL бэкенда
const BASE_URL = 'http://192.168.0.33:8000'; // Оставляем ваш IP, можно изменить на 'http://90.156.227.120:8000' при необходимости

// Создаём экземпляр axios
const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Добавляем таймаут для надёжности
});

// Перехватчик для запросов
client.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    console.log('Sending request:', config.url, config.params || config.data);
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request:', token);
    } else {
      console.log('No token found in AsyncStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

// Перехватчик для ответов
client.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  async (error) => {
    console.error('Response error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Unauthorized, attempting to refresh token...');
      originalRequest._retry = true;
      try {
        const { access_token } = await refreshToken();
        console.log('New access token obtained:', access_token);
        await AsyncStorage.setItem('token', access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return client(originalRequest); // Повторяем оригинальный запрос
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Очищаем AsyncStorage и перенаправляем на логин
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('role');
        // Можно добавить перенаправление на экран логина, например:
        // navigation.navigate('Login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;