import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';
import { Token, User, UserCreate, ApiError } from './types';

export const login = async (phone: string): Promise<{ status: string; message: string; user_id: number }> => {
  console.log('Attempting to login with phone:', phone);
  try {
    const response = await client.post('/api/auth/login', {}, { params: { phone } });
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw error.response?.data || { status: 'error', message: 'Failed to login', code: 500 };
  }
};

export const register = async (user: UserCreate): Promise<User> => {
  console.log('Attempting to register user:', user);
  try {
    const response = await client.post('/api/auth/register', user);
    console.log('Register successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Register error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw error.response?.data || { status: 'error', message: 'Failed to register', code: 500 };
  }
};

export const verify = async (phone: string, code: string): Promise<Token> => {
    console.log('Attempting to verify with phone:', phone, 'and code:', code);
    try {
      const response = await client.post('/api/auth/verify', {}, { params: { phone, code } });
      console.log('Verify successful:', response.data);
  
      try {
        await AsyncStorage.setItem('token', response.data.access_token);
        await AsyncStorage.setItem('userId', response.data.user_id.toString()); // ✅ добавлено!
        console.log('Token saved to AsyncStorage:', response.data.access_token);
        console.log('User ID saved to AsyncStorage:', response.data.user_id);
  
        if (response.data.role) {
          await AsyncStorage.setItem('role', response.data.role);
          console.log('Role saved to AsyncStorage:', response.data.role);
        }
      } catch (storageError) {
        console.error('Error saving to AsyncStorage:', storageError);
      }
  
      return response.data;
    } catch (error: any) {
      console.error('Verify error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      throw error.response?.data || { status: 'error', message: 'Failed to verify', code: 500 };
    }
  };
  

export const resendCode = async (phone: string): Promise<{ status: string; message: string }> => {
  console.log('Attempting to resend code for phone:', phone);
  try {
    const response = await client.post('/api/auth/resend-code', {}, { params: { phone } });
    console.log('Resend code successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Resend code error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw error.response?.data || { status: 'error', message: 'Failed to resend code', code: 500 };
  }
};

export const logout = async (): Promise<{ status: string; message: string }> => {
  console.log('Attempting to logout');
  try {
    // Если на бэкенде есть эндпоинт /api/auth/logout, раскомментируйте следующий код
    // const response = await client.post('/api/auth/logout');
    // console.log('Logout successful:', response.data);
    // return response.data;

    // Пока эндпоинта нет, просто возвращаем успех
    return { status: 'success', message: 'Logged out' };
  } catch (error: any) {
    console.error('Logout error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw error.response?.data || { status: 'error', message: 'Failed to logout', code: 500 };
  }
};