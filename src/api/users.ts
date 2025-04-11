import client from './client';
import { User } from './types';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await client.get('/api/users/');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get users', code: 500 };
  }
};