import client from './client';
import { Court, CourtCreate } from './types';

export const getAllCourts = async (): Promise<Court[]> => {
  try {
    const response = await client.get('/api/courts/');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get courts', code: 500 };
  }
};

export const createCourt = async (court: CourtCreate): Promise<Court> => {
  try {
    const response = await client.post('/api/courts/', court);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to create court', code: 500 };
  }
};