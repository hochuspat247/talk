export interface TimeSlot {
    /** Начало временного слота (например, "08:00"). */
    start: string;
  
    /** Конец временного слота (например, "09:00"). */
    end: string;
  
    /** Флаг, указывающий, забронирован ли слот. */
    isBooked: boolean;
  
    /** Список событий в слоте. */
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
    /** Обработчик выбора временных слотов (опционально). */
    onSelectionChange?: (selectedSlots: string[]) => void;
  
    /** Список забронированных слотов (опционально). */
    bookedSlots?: TimeSlot[];
  
    /** Дата в формате YYYY-MM-DD (опционально). */
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