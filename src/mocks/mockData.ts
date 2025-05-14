// mockData.ts

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

// ваш старый mockAvailability
export const mockAvailability: MockBookingAvailability[] = [
  {
    start: '11:00',
    end: '12:00',
    isBooked: true,
    guests: 10,
    events: [
      {
        salonName: 'BEAUTYLAB STORE',
        service: 'Окрашивание +1',
        masterName: 'Яна Иванова',
        rating: 4.9,
        time: '11:00',
        duration: '1ч',
        avatarUri: undefined,
        status: 'active',
      },
      {
        salonName: 'BEAUTYLAB STORE',
        service: 'Маникюр',
        masterName: 'Анна Петрова',
        rating: 4.7,
        time: '11:15',
        duration: '45мин',
        avatarUri: undefined,
        status: 'confirmed',
      },
      {
        salonName: 'BEAUTYLAB STORE',
        service: 'Стрижка',
        masterName: 'Мария Сидорова',
        rating: 4.8,
        time: '11:30',
        duration: '56мин',
        avatarUri: undefined,
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
        avatarUri: undefined,
        status: 'confirmed',
      },
    ],
  },
];

// пример mockUser
export const mockUser: MockUser = {
  firstName: 'Иван',
  lastName: 'Петров',
};


// Ещё ваши готовые данные для недели, теперь на май 2025
export interface WeeklyEvent {
  id: string;
  title: string;
  timeRange: string;
  location: string;
  status: 'Активно' | 'Подтверждено';
  price: string;
}

export interface DayEvents {
  date: string;        // "YYYY-MM-DD"
  events: WeeklyEvent[];
}

export const mockWeeklyDays: DayEvents[] = [
  { date: '2025-05-12', events: [] },
  { date: '2025-05-13', events: [] },
  {
    date: '2025-05-14',
    events: [
      {
        id: 'evt1',
        title: 'Снятие покрытия',
        timeRange: '09:00–10:00',
        location: '“BEAUTY LAB STORE”, Лубянский пр., стр. 1',
        status: 'Активно',
        price: '1 300 ₽',
      },
      {
        id: 'evt2',
        title: 'Окрашивание',
        timeRange: '13:00–14:00',
        location: '“BEAUTY LAB STORE”, Лубянский пр., стр. 1',
        status: 'Активно',
        price: '1 500 ₽',
      },
      {
        id: 'evt3',
        title: 'Маникюр',
        timeRange: '15:00–15:45',
        location: '“BEAUTY LAB STORE”, Лубянский пр., стр. 1',
        status: 'Подтверждено',
        price: '900 ₽',
      },
    ],
  },
  { date: '2025-05-15', events: [] },
  { date: '2025-05-16', events: [] },
  { date: '2025-05-17', events: [] },
  { date: '2025-05-18', events: [] },
];

/**
 * Мок-данные для отображения календаря за май 2025.
 * true  — есть свободные слоты (зелёная точка)
 * false — все занято (серая точка)
 */
export const mockMonthlyAvailability: Record<string, boolean> = {
  '2025-05-01': false,
  '2025-05-02': true,
  '2025-05-03': true,
  '2025-05-04': false,
  '2025-05-05': true,
  '2025-05-06': false,
  '2025-05-07': true,
  '2025-05-08': false,
  '2025-05-09': true,
  '2025-05-10': false,
  '2025-05-11': true,
  '2025-05-12': false,
  '2025-05-13': false,
  '2025-05-14': true,   // на эту дату есть события
  '2025-05-15': false,
  '2025-05-16': false,
  '2025-05-17': false,
  '2025-05-18': true,
  '2025-05-19': false,
  '2025-05-20': true,
  '2025-05-21': true,
  '2025-05-22': false,
  '2025-05-23': false,
  '2025-05-24': false,
  '2025-05-25': true,
  '2025-05-26': true,
  '2025-05-27': false,
  '2025-05-28': true,
  '2025-05-29': true,
  '2025-05-30': false,
  '2025-05-31': true,
};
