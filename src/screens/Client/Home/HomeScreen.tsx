// HomeScreen.tsx

import React, { useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';

import Header from '@components/Layout/Header';
import PeriodSwitch from '@components/UI/PeriodSwitch';
import BookingSummary from '@components/Layout/BookingSummary';
import TimePicker from '@components/Layout/TimePicker';
import WeeklyEventsList from '@components/Layout/WeeklyEventsList';
import AvailabilityCalendar from '@components/UI/AvailabilityCalendar';
import DetailedEventCard from '@components/UI/DetailedEventCard';
import Screen from '@components/Layout/Screen';
import Button from '@components/UI/Button';
import { useNavigation } from '@react-navigation/native'; // Импортируем хук для навигации
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Типизация для navigation
import { ClientStackParamList } from '@navigation/ClientNavigator'; // Импортируем типы из ClientNavigator

import { styles } from './styled';
import { HomeScreenProps, MockBookingAvailability } from './types';
import {
  mockAvailability,
  mockWeeklyDays,
  mockMonthlyAvailability,
} from '@mocks/mockData';
import {
  formatDate,
  formatDateForBookingSummary,
  calculatePriceAndGuests,
} from './utils';

// Локальное перечисление периодов
type PeriodType = 'today' | 'yesterday' | 'tomorrow' | 'week' | 'month';

// Типизация для navigation
type NavigationProp = NativeStackNavigationProp<ClientStackParamList>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<NavigationProp>(); // Получаем объект navigation
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');
  const [bookedSlots] = useState<MockBookingAvailability[]>(mockAvailability);

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    // Сброс даты на сегодня/вчера/завтра
    const now = new Date();
    const newDate = new Date(now);
    if (period === 'yesterday') newDate.setDate(now.getDate() - 1);
    else if (period === 'tomorrow') newDate.setDate(now.getDate() + 1);
    setSelectedDate(newDate);
  };

  // Подготовка слотов для TimePicker
  const safeBookedSlots = useMemo(
    () => bookedSlots.map(s => ({ ...s, events: s.events || [] })),
    [bookedSlots]
  );

  // Availability для календаря
  const availability = useMemo(() => mockMonthlyAvailability, []);

  // Строковое представление выбранной даты
  const selDateStr = moment(selectedDate).format('YYYY-MM-DD');
  // События из mockWeeklyDays по выбранной дате
  const dailyEvents = mockWeeklyDays.find(d => d.date === selDateStr)?.events || [];

  // Данные для BookingSummary (только для периода today)
  const { totalGuests, totalPrice } =
    selectedPeriod === 'today'
      ? calculatePriceAndGuests(safeBookedSlots)
      : { totalGuests: 0, totalPrice: 0 };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Screen>
        <Header title="TALLC" />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Переключатель периодов */}
            <PeriodSwitch
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
              style={styles.periodSwitch}
            />

            {/* Summary для today */}
            {selectedPeriod === 'today' && (
              <BookingSummary
                date={formatDateForBookingSummary(selectedDate)}
                guests={totalGuests}
                price={totalPrice}
              />
            )}

            {/* Основной контент */}
            {selectedPeriod === 'week' ? (
              <WeeklyEventsList days={mockWeeklyDays} />
            ) : selectedPeriod === 'month' ? (
              <View style={{ flex: 1 }}>
                {/* Календарь */}
                <AvailabilityCalendar
                  availability={availability}
                  selectedDate={moment(selectedDate).format('YYYY-MM-DD')}
                  onDatePress={iso => setSelectedDate(moment(iso, 'YYYY-MM-DD').toDate())}
                />

                {/* Summary для выбранной даты */}
                <BookingSummary
                  date={formatDateForBookingSummary(selectedDate)}
                  guests={totalGuests}
                  price={totalPrice}
                />

                {/* Карточки событий на выбранную дату */}
                {dailyEvents.length > 0 ? (
                  dailyEvents.map(evt => (
                    <DetailedEventCard
                      key={evt.id}
                      title={evt.title}
                      timeRange={evt.timeRange}
                      location={evt.location}
                      status={evt.status}
                      price={evt.price}
                    />
                  ))
                ) : (
                  <View style={{ padding: 16 }}>
                    <Text style={{ color: '#999', textAlign: 'center' }}>
                      Нет записей на выбранную дату
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <TimePicker
                onSelectionChange={() => {}}
                bookedSlots={safeBookedSlots}
                date={formatDate(selectedDate)}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </Screen>

      {/* Фиксированная кнопка в правом нижнем углу */}
      <Button
        title=""
        onPress={() => navigation.navigate('NewBooking')} // Переход на NewBookingScreen
        variant="icon"
        showIcon
        iconName="add"
        size="small"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;