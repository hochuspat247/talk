// Типы для пользователей
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  phone: string;
  photo: string | null;
  role: 'user' | 'admin';
  is_active: boolean;
}

export interface UserCreate {
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  phone: string;
  photo: string | null;
  password: string;
  is_admin: boolean;
}

export interface Token {
  access_token: string;
  refresh_token: string; // Обязательное поле
  token_type: string;
  role: string;
  user_id: number;
  expires_in: number; // Обязательное поле
}

// Типы для бронирований
export interface Booking {
  id: number;
  court_id: number;
  court?: string; // Optional, populated on frontend
  user_id: number;
  start_time: string; // ISO 8601
  end_time: string; // ISO 8601
  status: 'active' | 'canceled';
  price: number;
  user_name?: string; // For admins
  date?: string; // YYYY-MM-DD, for frontend
  time?: string; // HH:MM-HH:MM, for frontend
}

export interface BookingCreate {
  court_id: number;
  start_time: string; // ISO 8601
  end_time: string; // ISO 8601
  price: number;
  user_id?: number; // Optional, for admins
}

export interface BookingAvailability {
  start: string; // HH:MM
  end: string; // HH:MM
  is_booked: boolean;
  name?: string; // For admins
}

// Типы для кортов
export interface Court {
  id: number;
  name: string;
  description: string | null;
}

export interface CourtCreate {
  name: string;
  description: string | null;
}

// Типы для ошибок
export interface ApiError {
  status: string;
  message: string;
  code: number;
}