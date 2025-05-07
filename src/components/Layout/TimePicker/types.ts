export interface TimeSlot {
    
    start: string;
  
    
    end: string;
  
    
    isBooked: boolean;
  
    
    events: Array<{
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
  
  export interface TimePickerProps {
    
    onSelectionChange?: (selectedSlots: string[]) => void;
  
    
    bookedSlots?: TimeSlot[];
  
    
    date?: string;
  }
  
  export interface CalculatePositionParams {
    timeSlots: TimeSlot[];
    currentDate: moment.Moment;
    isToday: boolean;
    startHour: number;
    scrollOffset: number;
    timeTextHeight: number;
    standardSlotHeight: number;
    largeCardHeight: number;
    smallCardHeight: number;
  }
  
  export interface PositionData {
    isWithinRange: boolean;
    position: number;
    adjustedPosition: number;
  }