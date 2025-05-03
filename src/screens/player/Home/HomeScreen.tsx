import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text, RefreshControl } from 'react-native';
import Header from '@components/Layout/Header';
import PeriodSwitch, { PeriodType } from '@components/UI/PeriodSwitch';
import BookingSummary from '@components/Layout/BookingSummary';
import TimePicker from '@components/Layout/TimePicker';
import Screen from '@components/Layout/Screen';
import BottomNavigator from '@components/UI/BottomNavigator';
import { styles } from './styled';
import { mockUser, mockCourts, mockAvailability } from './mockData';
import moment from 'moment';
import 'moment/locale/ru';

// Принудительно устанавливаем локализацию на русский язык
moment.locale('ru');

type RootStackParamList = {
  Home: undefined;
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    name: string;
    time: string;
    price: number;
    selectedSlots: string[];
    fromMyBookings?: boolean;
    timesISO?: string[];
  };
  BookingSuccess: { court: string; court_id: number; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCourt] = useState<string>(mockCourts[0].name);
  const [selectedCourtId] = useState<number | null>(mockCourts[0].id);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [courts] = useState<string[]>(mockCourts.map((court) => court.name));
  const [courtIds] = useState<Map<string, number>>(
    new Map(mockCourts.map((court) => [court.name, court.id]))
  );
  const [bookedSlots, setBookedSlots] = useState<MockBookingAvailability[]>(mockAvailability);
  const [isLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentUser] = useState<{ firstName: string; lastName: string }>(mockUser);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');

  const formatDate = (date: Date): string => {
    const localMoment = moment(date);
    const year = localMoment.year();
    const month = String(localMoment.month() + 1).padStart(2, '0');
    const day = String(localMoment.date()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForBookingSummary = (date: Date): string => {
    return moment(date)
      .format('ddd, DD.MM')
      .replace(/\//g, '.');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setBookedSlots(mockAvailability);
      setRefreshing(false);
    }, 1000);
  }, []);

  const calculatePriceAndGuests = (slots: MockBookingAvailability[]): { totalPrice: number; totalGuests: number } => {
    const pricePerSlot = 1500;
    const totalSlots = slots.length;
    const totalPrice = totalSlots * pricePerSlot;
    const totalGuests = slots.reduce((sum, slot) => sum + (slot.guests || 0), 0);
    return { totalPrice, totalGuests };
  };

  // Обновляем дату и время каждую минуту, если выбран период "Сегодня"
  useEffect(() => {
    const updateDateTime = () => {
      if (selectedPeriod === 'today') {
        setSelectedDate(new Date());
      }
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000); // Обновляем каждую минуту
    return () => clearInterval(timer);
  }, [selectedPeriod]);

  // Обновляем дату при изменении периода
  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    const now = new Date();
    const newDate = new Date(now);

    if (period === 'yesterday') {
      newDate.setDate(now.getDate() - 1);
    } else if (period === 'tomorrow') {
      newDate.setDate(now.getDate() + 1);
    } else if (period === 'today') {
      newDate.setTime(now.getTime()); // Устанавливаем текущее время
    }

    setSelectedDate(newDate);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <Header userName={currentUser ? currentUser.firstName : 'Дмитрий'} />
        {isLoading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <PeriodSwitch
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
              style={styles.periodSwitch}
            />
            <BookingSummary
              date={formatDateForBookingSummary(selectedDate)}
              guests={calculatePriceAndGuests(bookedSlots).totalGuests}
              price={calculatePriceAndGuests(bookedSlots).totalPrice}
            />
            <TimePicker
              onSelectionChange={(slots: string[]) => setSelectedSlots(slots)}
              bookedSlots={bookedSlots}
              date={formatDate(selectedDate)}
            />
          </ScrollView>
        )}
      </Screen>
      <View style={styles.navWrapper}>
        <BottomNavigator activeTab="Home" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;