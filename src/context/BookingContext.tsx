import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBooking, getMyBookings, deleteBooking } from '@api/bookings';
import moment from 'moment-timezone';

// Устанавливаем таймзону
moment.tz.setDefault('Europe/Moscow');

// Интерфейс для объекта бронирования
interface Booking {
  id: number; // Уникальный идентификатор бронирования
  court_id: number; // ID корта
  court: string; // Название корта
  date: string; // Дата в формате YYYY-MM-DD
  time: string; // Время в формате HH:MM-HH:MM
  status: 'active' | 'canceled'; // Статус бронирования
  price: number; // Цена (число)
  start_time?: string; // Добавляем для отправки на бэкенд
  end_time?: string; // Добавляем для отправки на бэкенд
}

// Интерфейс для контекста бронирований
interface BookingContextType {
  bookings: Booking[]; // Список бронирований
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => Promise<void>; // Функция добавления одного бронирования
  addBookings: (newBookings: Omit<Booking, 'id' | 'status'>[]) => Promise<void>; // Функция добавления нескольких бронирований
  removeBooking: (bookingId: number) => Promise<void>; // Функция удаления бронирования
}

// Создаем контекст
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Провайдер контекста бронирований
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]); // Состояние для хранения списка бронирований

  // Загружаем бронирования при монтировании компонента
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const fetchedBookings = await getMyBookings(); // Получаем бронирования с сервера
        setBookings(fetchedBookings);
        await AsyncStorage.setItem('bookings', JSON.stringify(fetchedBookings)); // Сохраняем в локальное хранилище
      } catch (error) {
        console.error('Не удалось загрузить бронирования с API:', error);
        try {
          const storedBookings = await AsyncStorage.getItem('bookings'); // Пробуем загрузить из локального хранилища
          if (storedBookings) setBookings(JSON.parse(storedBookings));
        } catch (storageError) {
          console.error('Не удалось загрузить бронирования из AsyncStorage:', storageError);
        }
      }
    };
    loadBookings();
  }, []);

  // Функция добавления одного бронирования
  const addBooking = async (booking: Omit<Booking, 'id' | 'status'>) => {
    try {
      // Проверяем наличие обязательных полей
      if (!booking.date || !booking.time || !booking.court_id) {
        throw new Error('Отсутствуют обязательные поля для бронирования');
      }

      // Проверяем формат даты (должен быть YYYY-MM-DD)
      if (!moment(booking.date, 'YYYY-MM-DD', true).isValid()) {
        console.log('Получена некорректная дата в addBooking:', booking.date);
        throw new Error(`Неверный формат даты: ${booking.date}. Ожидается YYYY-MM-DD`);
      }

      // Разделяем время на начало и конец (например, "20:00-21:00")
      const [startTime, endTime] = booking.time.split('-');
      if (!startTime || !endTime) {
        throw new Error(`Неверный формат времени: ${booking.time}. Ожидается HH:MM-HH:MM`);
      }

      // Создаем объекты даты и времени в формате Europe/Moscow
      const startDateTime = moment(`${booking.date} ${startTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow');
      const endDateTime = moment(`${booking.date} ${endTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow');

      // Проверяем валидность дат
      if (!startDateTime.isValid() || !endDateTime.isValid()) {
        throw new Error(`Неверная дата/время: ${booking.date} ${booking.time}`);
      }

      // Проверка, что время в будущем
      const now = moment().tz('Europe/Moscow');
      if (startDateTime.isSameOrBefore(now)) {
        throw new Error('Время бронирования должно быть в будущем');
      }

      // Проверка, что endTime позже startTime
      if (endDateTime.isSameOrBefore(startDateTime)) {
        throw new Error('Время окончания должно быть позже времени начала');
      }

      // Проверка, что startTime и endTime в одном дне
      if (startDateTime.date() !== endDateTime.date()) {
        throw new Error('Бронирование не может пересекать полночь. Начало и конец должны быть в одном дне');
      }

      // Проверяем цену
      const price = Number(booking.price);
      if (isNaN(price) || price <= 0) {
        throw new Error(`Неверная цена: ${booking.price}. Должна быть положительным числом`);
      }

      // Формируем данные для отправки на сервер
      const bookingData = {
        court_id: booking.court_id,
        start_time: startDateTime.format('YYYY-MM-DD HH:mm:ss'), // Формат без tzinfo
        end_time: endDateTime.format('YYYY-MM-DD HH:mm:ss'), // Формат без tzinfo
        price: price,
      };

      console.log('Данные бронирования:', bookingData);

      // Отправляем запрос на создание бронирования
      const newBooking = await createBooking(bookingData);
      const updatedBookings = [...bookings, { ...newBooking, court: booking.court, date: booking.date, time: booking.time }];
      setBookings(updatedBookings);
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (error: any) {
      console.error('Не удалось создать бронирование:', error.message || error);
      throw error;
    }
  };

  // Функция добавления нескольких бронирований
  const addBookings = async (newBookings: Omit<Booking, 'id' | 'status'>[]) => {
    try {
      const createdBookings: Booking[] = [];
      for (const booking of newBookings) {
        // Проверяем наличие обязательных полей
        if (!booking.date || !booking.time || !booking.court_id) {
          throw new Error('Отсутствуют обязательные поля для бронирования');
        }

        // Проверяем формат даты
        if (!moment(booking.date, 'YYYY-MM-DD', true).isValid()) {
          console.log('Получена некорректная дата в addBookings:', booking.date);
          throw new Error(`Неверный формат даты: ${booking.date}. Ожидается YYYY-MM-DD`);
        }

        // Разделяем время на начало и конец
        const [startTime, endTime] = booking.time.split('-');
        if (!startTime || !endTime) {
          throw new Error(`Неверный формат времени: ${booking.time}. Ожидается HH:MM-HH:MM`);
        }

        // Создаем объекты даты и времени в формате Europe/Moscow
        const startDateTime = moment(`${booking.date} ${startTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow');
        const endDateTime = moment(`${booking.date} ${endTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow');

        // Проверяем валидность дат
        if (!startDateTime.isValid() || !endDateTime.isValid()) {
          throw new Error(`Неверная дата/время: ${booking.date} ${booking.time}`);
        }

        // Проверка, что время в будущем
        const now = moment().tz('Europe/Moscow');
        if (startDateTime.isSameOrBefore(now)) {
          throw new Error('Время бронирования должно быть в будущем');
        }

        // Проверка, что endTime позже startTime
        if (endDateTime.isSameOrBefore(startDateTime)) {
          throw new Error('Время окончания должно быть позже времени начала');
        }

        // Проверка, что startTime и endTime в одном дне
        if (startDateTime.date() !== endDateTime.date()) {
          throw new Error('Бронирование не может пересекать полночь. Начало и конец должны быть в одном дне');
        }

        // Проверяем цену
        const price = Number(booking.price);
        if (isNaN(price) || price <= 0) {
          throw new Error(`Неверная цена: ${booking.price}. Должна быть положительным числом`);
        }

        // Формируем данные для отправки
        const bookingData = {
          court_id: booking.court_id,
          start_time: startDateTime.format('YYYY-MM-DD HH:mm:ss'), // Формат без tzinfo
          end_time: endDateTime.format('YYYY-MM-DD HH:mm:ss'), // Формат без tzinfo
          price: price,
        };

        console.log('Данные бронирования:', bookingData);

        // Создаем бронирование
        const newBooking = await createBooking(bookingData);
        createdBookings.push({ ...newBooking, court: booking.court, date: booking.date, time: booking.time });
      }

      // Обновляем список бронирований
      const updatedBookings = [...bookings, ...createdBookings];
      setBookings(updatedBookings);
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (error: any) {
      console.error('Не удалось создать бронирования:', error.message || error);
      throw error;
    }
  };

  // Функция удаления бронирования
  const removeBooking = async (bookingId: number) => {
    try {
      await deleteBooking(bookingId); // Удаляем бронирование через API
      const updatedBookings = bookings.filter((b) => b.id !== bookingId); // Фильтруем список
      setBookings(updatedBookings); // Обновляем состояние
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings)); // Сохраняем в локальное хранилище
    } catch (error) {
      console.error('Не удалось удалить бронирование:', error);
      throw error;
    }
  };

  // Возвращаем провайдер контекста
  return (
    <BookingContext.Provider value={{ bookings, addBooking, addBookings, removeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// Хук для использования контекста
export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings должен использоваться внутри BookingProvider');
  return context;
};

export default BookingProvider;