import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import Header from '@components/Layout/Header';
import PeriodSwitch, { PeriodType } from '@components/UI/PeriodSwitch';
import BookingSummary from '@components/Layout/BookingSummary';
import TimePicker from '@components/Layout/TimePicker';
import Screen from '@components/Layout/Screen';
import BottomNavigator from '@components/UI/BottomNavigator';
import { styles } from './styled';
import { HomeScreenProps, MockBookingAvailability, MockUser } from './types';
import { mockUser, mockAvailability } from '@mocks/mockData';
import { formatDate, formatDateForBookingSummary, calculatePriceAndGuests } from './utils';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [currentUser] = useState<MockUser>(mockUser);
  const [bookedSlots] = useState<MockBookingAvailability[]>(mockAvailability);

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    const now = new Date();
    const newDate = new Date(now);

    if (period === 'yesterday') {
      newDate.setDate(now.getDate() - 1);
    } else if (period === 'tomorrow') {
      newDate.setDate(now.getDate() + 1);
    }

    setSelectedDate(newDate);
  };

  const safeBookedSlots = bookedSlots.map((slot) => ({
    ...slot,
    events: slot.events || [],
  }));

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Screen>
        <Header title={currentUser.firstName} />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
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
              onSelectionChange={setSelectedSlots}
              bookedSlots={safeBookedSlots}
              date={formatDate(selectedDate)}
            />
          </ScrollView>
        </SafeAreaView>
      </Screen>
      <View style={styles.navWrapper}>
        <BottomNavigator activeTab="Home" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;