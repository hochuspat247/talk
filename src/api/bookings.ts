import client from './client';
import { Booking, BookingCreate, BookingAvailability } from './types';

export const createBooking = async (booking: BookingCreate): Promise<Booking> => {
  try {
    const response = await client.post('/api/bookings/', booking);
    console.log('Create booking response:', response.data);
    return response.data;
  } catch (error: any) {
    const errorDetail = error.response?.data?.detail || 'Failed to create booking';
    console.error('Create booking error:', errorDetail);
    throw new Error(errorDetail);
  }
};

export const getMyBookings = async (userId?: number): Promise<Booking[]> => {
  try {
    const response = await client.get('/api/bookings/my', { params: { user_id: userId } });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get bookings', code: 500 };
  }
};

export const getAllBookings = async (): Promise<Booking[]> => {
  try {
    const response = await client.get('/api/bookings/all');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get all bookings', code: 500 };
  }
};

export const getBooking = async (id: number): Promise<Booking> => {
  try {
    const response = await client.get(`/api/bookings/${id}`); // Исправлено
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get booking', code: 500 };
  }
};

export const deleteBooking = async (id: number): Promise<{ status: string; message: string }> => {
  try {
    const response = await client.delete(`/api/bookings/${id}`); // Исправлено
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to delete booking', code: 500 };
  }
};

export const getAvailability = async (courtId: number, date: string): Promise<BookingAvailability[]> => {
  
    if (courtId === undefined || date === undefined) {
      throw new Error(`❌ getAvailability called with invalid params: courtId=${courtId}, date=${date}`);
    }
  
    const response = await client.get('/api/bookings/availability', {
      params: { court_id: courtId, date },
    });
    return response.data;
  };
  
  

export const filterBookings = async (dateFrom: string, dateTo: string, court?: string, userIds?: number[]): Promise<Booking[]> => {
  try {
    const response = await client.get('/api/bookings/filter', { params: { date_from: dateFrom, date_to: dateTo, court, user_ids: userIds } });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to filter bookings', code: 500 };
  }
};