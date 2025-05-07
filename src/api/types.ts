
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  phone: string;
  photo: string | null;
  role: 'user' | 'Master';
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
  is_Master: boolean;
}

export interface Token {
  access_token: string;
  refresh_token: string; 
  token_type: string;
  role: string;
  user_id: number;
  expires_in: number; 
}


export interface Booking {
  id: number;
  court_id: number;
  court?: string; 
  user_id: number;
  start_time: string; 
  end_time: string; 
  status: 'active' | 'canceled';
  price: number;
  user_name?: string; 
  date?: string; 
  time?: string; 
}

export interface BookingCreate {
  court_id: number;
  start_time: string; 
  end_time: string; 
  price: number;
  user_id?: number; 
}

export interface BookingAvailability {
  start: string; 
  end: string; 
  is_booked: boolean;
  name?: string; 
}


export interface Court {
  id: number;
  name: string;
  description: string | null;
}

export interface CourtCreate {
  name: string;
  description: string | null;
}


export interface ApiError {
  status: string;
  message: string;
  code: number;
}