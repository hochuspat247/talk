// @mocks/mockData.ts

export interface MockUser {
    firstName: string;
    lastName: string;
  }
  
  export interface MockCourt {
    id: number;
    name: string;
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
      guests: number; // Добавляем поле для гостей каждого события
      avatarUri?: string;
      status: 'confirmed' | 'active';
    }>;
  }
  
  export const mockUser: MockUser = {
    firstName: 'Дмитрий',
    lastName: 'Иванов',
  };
  
  export const mockCourts: MockCourt[] = [
    { id: 1, name: 'Корт 1' },
    { id: 2, name: 'Корт 2' },
    { id: 3, name: 'Корт 3' },
  ];
  
  export const mockAvailability: MockBookingAvailability[] = [
    {
      start: '11:00',
      end: '12:00',
      isBooked: true,
      guests: 10, // 4 + 3 + 3
      events: [
        {
          salonName: 'BEAUTYLAB STORE',
          service: 'Окрашивание +1',
          masterName: 'Яна Иванова',
          rating: 4.9,
          time: '11:00',
          duration: '1ч',
          guests: 4,
          status: 'active',
        },
        {
          salonName: 'BEAUTYLAB STORE',
          service: 'Маникюр',
          masterName: 'Анна Петрова',
          rating: 4.7,
          time: '11:15',
          duration: '45мин',
          guests: 3,
          status: 'confirmed',
        },
        {
          salonName: 'BEAUTYLAB STORE',
          service: 'Стрижка',
          masterName: 'Мария Сидорова',
          rating: 4.8,
          time: '11:30',
          duration: '56мин', // Исправлено с 30мин на 56мин
          guests: 3,
          status: 'active',
        },
      ],
    },
    {
      start: '14:00',
      end: '15:00',
      isBooked: true,
      guests: 2,
      events: [
        {
          salonName: 'BEAUTYLAB STORE',
          service: 'Стрижка',
          masterName: 'Яна Иванова',
          rating: 4.9,
          time: '14:00',
          duration: '1ч',
          guests: 2,
          status: 'confirmed',
        },
      ],
    },
  ];