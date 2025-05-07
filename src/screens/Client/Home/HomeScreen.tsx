import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Header from '@components/Layout/Header';
import PeriodSwitch, { PeriodType } from '@components/UI/PeriodSwitch';
import BookingSummary from '@components/Layout/BookingSummary';
import TimePicker from '@components/Layout/TimePicker';
import Screen from '@components/Layout/Screen';
import BottomNavigator from '@components/UI/BottomNavigator';
import { styles } from './styled';
import { HomeScreenProps, MockBookingAvailability, MockCourt, MockUser } from './types';
import { mockUser, mockCourts, mockAvailability } from '@mocks/mockData';
import { formatDate, formatDateForBookingSummary, calculatePriceAndGuests } from './utils';
import { PRICE_PER_SLOT } from './constants';

/**
 * Главный экран приложения, отображающий бронирования, переключатель периодов и навигацию.
 *
 * @param {HomeScreenProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент главного экрана.
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCourt] = useState<string>(mockCourts[0].name);
  const [selectedCourtId] = useState<number | null>(mockCourts[0].id);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [courts] = useState<string[]>(mockCourts.map((court) => court.name));
  const [courtIds] = useState<Map<string, number>>(
    new Map(mockCourts.map((court) => [court.name, court.id]))
  );
  const [bookedSlots] = useState<MockBookingAvailability[]>(mockAvailability);
  const [isLoading] = useState<boolean>(false);
  const [currentUser] = useState<MockUser>(mockUser);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');

  useEffect(() => {
    const updateDateTime = () => {
      if (selectedPeriod === 'today') {
        setSelectedDate(new Date());
      }
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);
    return () => clearInterval(timer);
  }, [selectedPeriod]);

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    const now = new Date();
    const newDate = new Date(now);

    if (period === 'yesterday') {
      newDate.setDate(now.getDate() - 1);
    } else if (period === 'tomorrow') {
      newDate.setDate(now.getDate() + 1);
    } else if (period === 'today') {
      newDate.setTime(now.getTime());
    }

    setSelectedDate(newDate);
  };

  const safeBookedSlots = bookedSlots.map(slot => ({
    ...slot,
    events: slot.events || [],
  }));

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <Header userName={currentUser ? currentUser.firstName : 'Дмитрий'} />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <SafeAreaView style={styles.safeArea}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
            >
              <PeriodSwitch
                selectedPeriod={selectedPeriod}
                onPeriodChange={handlePeriodChange}
                style={styles.periodSwitch}
              />
              <BookingSummary
                date={formatDateForBookingSummary(selectedDate)}
                guests={calculatePriceAndGuests(safeBookedSlots).totalGuests}
                price={calculatePriceAndGuests(safeBookedSlots).totalPrice}
              />
              <TimePicker
                onSelectionChange={(slots: string[]) => setSelectedSlots(slots)}
                bookedSlots={safeBookedSlots}
                date={formatDate(selectedDate)}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      </Screen>
      <View style={styles.navWrapper}>
        <BottomNavigator activeTab="Home" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;