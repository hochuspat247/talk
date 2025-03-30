import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Booking {
  court: string;
  date: string;
  time: string;
  status: 'active' | 'canceled';
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  addBookings: (newBookings: Booking[]) => void; // Новая функция для добавления нескольких бронирований
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Загружаем бронирования из AsyncStorage при монтировании
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        if (storedBookings) {
          setBookings(JSON.parse(storedBookings));
        }
      } catch (error) {
        console.error('Failed to load bookings from AsyncStorage:', error);
      }
    };
    loadBookings();
  }, []);

  // Функция для добавления одного бронирования
  const addBooking = async (booking: Booking) => {
    try {
      const newBookings = [...bookings, booking];
      setBookings(newBookings);
      await AsyncStorage.setItem('bookings', JSON.stringify(newBookings));
    } catch (error) {
      console.error('Failed to save booking to AsyncStorage:', error);
    }
  };

  // Функция для добавления нескольких бронирований
  const addBookings = async (newBookings: Booking[]) => {
    try {
      const updatedBookings = [...bookings, ...newBookings];
      setBookings(updatedBookings);
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Failed to save bookings to AsyncStorage:', error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, addBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};