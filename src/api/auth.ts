
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import client from './axiosInstance';
import { Token, User, UserCreate, ApiError } from './types';

export const login = async (phone: string): Promise<{ status: string; message: string; user_id: number }> => {
  try {
    const response = await client.post('/api/auth/login', {}, { params: { phone } });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to login', code: 500 };
  }
};

export const register = async (user: UserCreate): Promise<User> => {
  try {
    const response = await client.post('/api/auth/register', user);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to register', code: 500 };
  }
};

export const verify = async (phone: string, code: string): Promise<Token> => {
  try {
    const response = await client.post('/api/auth/verify', {}, { params: { phone, code } });
    console.log('Verify response:', JSON.stringify(response.data, null, 2));
    try {
      await AsyncStorage.setItem('token', response.data.access_token);
      await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
      await AsyncStorage.setItem('userId', response.data.user_id.toString());
      await AsyncStorage.setItem('role', response.data.role);
      const expirationTime = Date.now() + response.data.expires_in * 1000;
      await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());

      
      await SecureStore.setItemAsync('refreshToken', response.data.refresh_token);
      await SecureStore.setItemAsync('userId', response.data.user_id.toString());
      await SecureStore.setItemAsync('phone', phone);

      console.log('AsyncStorage after verify:', await AsyncStorage.multiGet(['token', 'refreshToken', 'tokenExpiration', 'userId', 'role']));
      console.log('SecureStore after verify:', {
        refreshToken: await SecureStore.getItemAsync('refreshToken'),
        userId: await SecureStore.getItemAsync('userId'),
        phone: await SecureStore.getItemAsync('phone'),
      });
    } catch (storageError) {
      console.error('Error saving to AsyncStorage/SecureStore:', storageError);
      throw new Error('Failed to save authentication data');
    }
    return response.data;
  } catch (error: any) {
    console.error('Verify error:', error.response?.data || error.message);
    throw error.response?.data || { status: 'error', message: 'Failed to verify', code: 500 };
  }
};

export const refreshToken = async (): Promise<{ access_token: string; expires_in: number; refresh_token?: string }> => {
  try {
    let refreshTokenStored = await SecureStore.getItemAsync('refreshToken');
    if (!refreshTokenStored) {
      refreshTokenStored = await AsyncStorage.getItem('refreshToken');
    }
    console.log('Attempting to refresh token with refreshToken:', refreshTokenStored);

    if (!refreshTokenStored) {
      throw new Error('No refresh token found');
    }

    
    const response = await client.post('/api/auth/refresh', {}, {
      params: {
        refresh_token: refreshTokenStored,
      },
    });
    console.log('Refresh token response:', response.data);

    await AsyncStorage.setItem('token', response.data.access_token);
    const expiresIn = response.data.expires_in || 3600;
    const expirationTime = Date.now() + expiresIn * 1000;
    await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());

    
    if (response.data.refresh_token) {
      await SecureStore.setItemAsync('refreshToken', response.data.refresh_token);
      await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
      console.log('New refresh token saved:', response.data.refresh_token);
    }

    console.log('AsyncStorage after refresh:', await AsyncStorage.multiGet(['token', 'tokenExpiration']));
    console.log('SecureStore after refresh:', {
      refreshToken: await SecureStore.getItemAsync('refreshToken'),
    });

    return response.data;
  } catch (error: any) {
    console.error('Refresh token error:', error.response?.data || error.message);
    throw error.response?.data || { status: 'error', message: 'Failed to refresh token', code: 401 };
  }
};

export const resendCode = async (phone: string): Promise<{ status: string; message: string }> => {
  try {
    const response = await client.post('/api/auth/resend-code', {}, { params: { phone } });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to resend code', code: 500 };
  }
};

export const logout = async (): Promise<{ status: string; message: string }> => {
  try {
    
    await AsyncStorage.clear();
    console.log('AsyncStorage after logout:', await AsyncStorage.multiGet(['token', 'refreshToken', 'tokenExpiration', 'userId', 'role']));
    console.log('SecureStore after logout:', {
      refreshToken: await SecureStore.getItemAsync('refreshToken'),
      userId: await SecureStore.getItemAsync('userId'),
      phone: await SecureStore.getItemAsync('phone'),
    });
    return { status: 'success', message: 'Logged out' };
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to logout', code: 500 };
  }
};

export const initializeAuth = async (): Promise<string | null> => {
  try {
    const keys = await AsyncStorage.multiGet(['token', 'refreshToken', 'tokenExpiration', 'userId', 'role']);
    console.log('initializeAuth - AsyncStorage keys:', keys);
    const [token, refreshTokenStored, tokenExpiration, userId, role] = keys.map(([_, value]) => value);

    
    const secureRefreshToken = await SecureStore.getItemAsync('refreshToken');
    const secureUserId = await SecureStore.getItemAsync('userId');
    console.log('initializeAuth - SecureStore keys:', { refreshToken: secureRefreshToken, userId: secureUserId });

    if (secureRefreshToken && secureUserId) {
      if (!token || !tokenExpiration || parseInt(tokenExpiration) <= Date.now() - 5 * 60 * 1000) {
        console.log('Token missing or expired, refreshing...');
        const refreshedData = await refreshToken();
        await AsyncStorage.setItem('userId', secureUserId);
        await AsyncStorage.setItem('role', role || 'user');
        return refreshedData.access_token;
      } else {
        console.log('Token is still valid');
        return token;
      }
    } else {
      console.log('Missing refreshToken or userId in SecureStore');
      
      const phone = await SecureStore.getItemAsync('phone');
      if (phone) {
        console.log('Found phone in SecureStore, attempting auto-login:', phone);
        const loginResponse = await login(phone);
        
        return null;
      }
      return null;
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
    return null;
  }
};