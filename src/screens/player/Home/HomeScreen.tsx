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
  Bookings: { court: string; date: string; name: string; time: string; price: string; selectedSlots: string[]; fromMyBookings?: boolean };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedCourt, setSelectedCourt] = useState<string>('Корт №3');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const courts = ['Корт №1', 'Корт №2', 'Корт №3', 'Корт №4'];

  // Функция для форматирования времени в формате "первое время - последнее время"
  const formatTimeRange = (slots: string[]): string => {
    if (!slots || slots.length === 0) return '';

    // Сортируем слоты по времени начала
    const sortedSlots = [...slots].sort((a, b) => {
      const startA = a.split('-')[0]; // Например, "20:00"
      const startB = b.split('-')[0];
      return startA.localeCompare(startB);
    });

    // Берем первое время из первого слота и последнее время из последнего слота
    const firstTime = sortedSlots[0].split('-')[0]; // Например, "20:00"
    const lastTime = sortedSlots[sortedSlots.length - 1].split('-')[1]; // Например, "23:00"

    return `${firstTime}-${lastTime}`; // Например, "20:00-23:00"
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
    const pricePerSlot = 1500; // Стоимость одного слота
    const totalPrice = slots.length * pricePerSlot;
    return `${totalPrice} ₽`;
  };

  const handleBooking = () => {
    console.log('Забронированы слоты:', selectedSlots);
    const formattedTime = formatTimeRange(selectedSlots); // Форматируем время для BookingConfirmation
    const formattedDate = formatDate(selectedDate); // Форматируем дату
    const totalPrice = calculatePrice(selectedSlots); // Рассчитываем стоимость

    // Переходим на страницу Bookings
    navigation.navigate('Bookings', {
      court: selectedCourt,
      date: formattedDate,
      name: 'Иванов Иван',
      time: formattedTime,
      price: totalPrice,
      selectedSlots: selectedSlots,
      fromMyBookings: false, // Указываем, что переход выполнен с HomeScreen
    });

    // Очищаем выбранные слоты
    setSelectedSlots([]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Screen>
        <Header userName="Дмитрий" />

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

        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <TimePicker
              onSelectionChange={(slots: string[]) => setSelectedSlots(slots)}
            />
          </View>
        </ScrollView>

        {selectedSlots.length > 0 && (
          <BlurView intensity={70} tint="light" style={styles.bookButtonWrapper}>
            <View style={{ width: '100%' }}>
              <Button
                title="Забронировать"
                onPress={handleBooking}
                variant="primary"
              />
            </View>
          </BlurView>
        )}
      </Screen>

      <BottomNavigator activeTab="Home" />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;