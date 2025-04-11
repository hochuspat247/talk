import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Базовый URL бэкенда
const BASE_URL = 'http://192.168.0.33:8000'; // Обновляем IP-адрес

// Создаём экземпляр axios
const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для запросов
client.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    console.log('Sending request:', config.url, config.params);
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
  (error) => {
    console.error('Response error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    if (error.response?.status === 401) {
      console.error('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default client;