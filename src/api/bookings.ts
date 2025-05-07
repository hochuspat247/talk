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
    const response = await client.get(`/api/bookings/${id}`); 
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { status: 'error', message: 'Failed to get booking', code: 500 };
  }
};

export const deleteBooking = async (id: number): Promise<{ status: string; message: string }> => {
  try {
    const response = await client.delete(`/api/bookings/${id}`); 
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
  
  interface FilterParams {
    date_from?: string;
    date_to?: string;
    court?: string;
    user_ids?: number[];
  }
  
  export const filterBookings = async (params: FilterParams): Promise<Booking[]> => {
    try {
      const response = await client.get('/api/bookings/filter', {
        params: {
          date_from: params.date_from || undefined,
          date_to: params.date_to || undefined,
          court: params.court || undefined,
          user_ids: params.user_ids && Array.isArray(params.user_ids) && params.user_ids.length > 0 ? params.user_ids : undefined,
        },
        paramsSerializer: (params) => {
          
          const searchParams = new URLSearchParams();
          for (const key in params) {
            if (Array.isArray(params[key])) {
              params[key].forEach((value: any) => {
                searchParams.append(`${key}`, value.toString());
              });
            } else if (params[key] !== undefined) {
              searchParams.append(key, params[key].toString());
            }
          }
          return searchParams.toString();
        },
      });
      console.log('Response from filterBookings:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Ошибка при фильтрации бронирований:', error);
      throw error.response?.data || { status: 'error', message: 'Failed to filter bookings', code: 500 };
    }
  };