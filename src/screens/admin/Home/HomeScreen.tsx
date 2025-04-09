import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '@components/Header';
import DatePicker from '@components/DatePicker';
import TimePicker from '@components/TimePicker';
import CourtSelector from '@components/CourtSelector';
import Screen from '@components/Screen';
import BottomNavigator from '@components/BottomNavigator';
import Button from '@components/Button';
import { styles } from './styled';
import { BlurView } from 'expo-blur';
import { StackScreenProps } from '@react-navigation/stack';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  SelectUser: {
    court: string;
    date: string;
    time: string;
    price: string;
    selectedSlots: string[];
  };
  Bookings: {
    court: string;
    date: string;
    name: string;
    time: string;
    price: string;
    selectedSlots: string[];
    fromMyBookings?: boolean;
  };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

// Пример данных о бронированиях с увеличенным количеством слотов
const bookedSlotsData = [
  { start: '08:00', end: '09:00', isBooked: true, name: 'Иван Г.' },
  { start: '09:00', end: '10:00', isBooked: true, name: 'Алексей П.' },
  { start: '10:00', end: '11:00', isBooked: true, name: 'Сергей К.' },
  { start: '11:00', end: '12:00', isBooked: true, name: 'Мария С.' },
  { start: '12:00', end: '13:00', isBooked: true, name: 'Ольга В.' },
  { start: '14:00', end: '15:00', isBooked: true, name: 'Павел Д.' },
  { start: '16:00', end: '17:00', isBooked: true, name: 'Екатерина М.' },
  { start: '18:00', end: '19:00', isBooked: true, name: 'Дмитрий И.' },
  { start: '19:00', end: '20:00', isBooked: true, name: 'Анна Л.' },
  { start: '21:00', end: '22:00', isBooked: true, name: 'Николай Р.' },
];

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedCourt, setSelectedCourt] = useState<string>('Корт №3');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const courts = ['Корт №1', 'Корт №2', 'Корт №3', 'Корт №4'];

  // Текущий пользователь (администратор)
  const currentUser = { firstName: 'Админ', lastName: 'Админов' };

  // Функция для форматирования имени в формате "Иван Г."
  const formatUserName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName.charAt(0)}.`;
  };

  // Функция для форматирования времени в формате "первое время - последнее время"
  const formatTimeRange = (slots: string[]): string => {
    if (!slots || slots.length === 0) return '';

    const sortedSlots = [...slots].sort((a, b) => {
      const startA = a.split('-')[0];
      const startB = b.split('-')[0];
      return startA.localeCompare(startB);
    });

    const firstTime = sortedSlots[0].split('-')[0];
    const lastTime = sortedSlots[sortedSlots.length - 1].split('-')[1];

    return `${firstTime}-${lastTime}`;
  };

  // Функция для форматирования даты в формат "дд.мм.гггг"
  const formatDate = (day: number): string => {
    const currentDate = new Date();
    const selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return selectedFullDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '.');
  };

  // Функция для расчета стоимости
  const calculatePrice = (slots: string[]): string => {
    const pricePerSlot = 1500;
    const totalPrice = slots.length * pricePerSlot;
    return `${totalPrice} ₽`;
  };

  const handleBooking = () => {
    console.log('Забронированы слоты:', selectedSlots);
    const formattedTime = formatTimeRange(selectedSlots);
    const formattedDate = formatDate(selectedDate);
    const totalPrice = calculatePrice(selectedSlots);

    // Переходим на экран выбора пользователя
    navigation.navigate('SelectUser', {
      court: selectedCourt,
      date: formattedDate,
      time: formattedTime,
      price: totalPrice,
      selectedSlots: selectedSlots,
    });

    // Очищаем выбранные слоты
    setSelectedSlots([]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <Header userName="Админ" />

        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={(day) => setSelectedDate(day)}
          daysToShow={30}
        />

        <CourtSelector
          selectedCourt={selectedCourt}
          onCourtSelect={(court) => setSelectedCourt(court)}
          courts={courts}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <TimePicker
              onSelectionChange={(slots: string[]) => setSelectedSlots(slots)}
              bookedSlots={bookedSlotsData}
            />
          </View>
        </ScrollView>

        {selectedSlots.length > 0 && (
          <BlurView intensity={70} tint="light" style={styles.bookButtonWrapper}>
            <View style={{ width: '100%' }}>
              <Button title="Забронировать" onPress={handleBooking} variant="primary" />
            </View>
          </BlurView>
        )}
      </Screen>

      <BottomNavigator activeTab="Home" />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;