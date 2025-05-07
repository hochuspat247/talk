import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    name: string;
    time: string;
    price: number;
    selectedSlots: string[];
    fromMyBookings?: boolean;
    timesISO?: string[];
  };
  BookingSuccess: { court: string; court_id: number; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

export interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

export interface MockBookingAvailability {
  start: string;
  end: string;
  isBooked: boolean;
  guests?: number;
  events?: Array<{
    salonName: string;
    service: string;
    masterName: string;
    rating: number;
    time: string;
    duration: string;
    avatarUri?: string;
    status: 'confirmed' | 'active';
  }>;
}

export interface MockUser {
  firstName: string;
  lastName: string;
}

export interface MockCourt {
  id: number;
  name: string;
}