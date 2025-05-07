import client from './client';
import { User } from './types';

export const getProfile = async (userId: number): Promise<User> => {
  try {
    const response = await client.get(`/api/profile/${userId}`); 
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get profile', code: 500 };
  }
};

export const updateProfile = async (userId: number, updatedData: Partial<User>): Promise<User> => {
  try {
    const response = await client.patch(`/api/profile/${userId}`, updatedData); 
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to update profile', code: 500 };
  }
};