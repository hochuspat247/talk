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
      // Сохраняем access_token
      if (response.data.access_token) {
        await AsyncStorage.setItem('token', response.data.access_token);
        console.log('Token saved to AsyncStorage:', response.data.access_token);
      } else {
        console.warn('Access token not found in verify response');
      }

      // Сохраняем refresh_token, если он есть
      if (response.data.refresh_token) {
        await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
        console.log('Refresh token saved to AsyncStorage:', response.data.refresh_token);
      } else {
        console.warn('Refresh token not found in verify response');
      }

      // Сохраняем userId
      if (response.data.user_id) {
        await AsyncStorage.setItem('userId', response.data.user_id.toString());
        console.log('User ID saved to AsyncStorage:', response.data.user_id);
      } else {
        console.warn('User ID not found in verify response');
      }

      // Сохраняем role, если есть
      if (response.data.role) {
        await AsyncStorage.setItem('role', response.data.role);
        console.log('Role saved to AsyncStorage:', response.data.role);
      }
    } catch (storageError) {
      console.error('Error saving to AsyncStorage:', storageError);
      throw new Error('Failed to save authentication data');
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

export const refreshToken = async (): Promise<{ access_token: string }> => {
  console.log('Attempting to refresh token');
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Рефреш-токен не найден');
    }

    const response = await client.post('/api/auth/refresh', { refresh_token: refreshToken });
    console.log('Refresh token successful:', response.data);

    await AsyncStorage.setItem('token', response.data.access_token);
    console.log('New access token saved to AsyncStorage:', response.data.access_token);

    return response.data;
  } catch (error: any) {
    console.error('Refresh token error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });
    throw error.response?.data || { status: 'error', message: 'Failed to refresh token', code: 401 };
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
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('role');
    console.log('AsyncStorage cleared');
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