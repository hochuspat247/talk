export interface BookingAvailability {
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