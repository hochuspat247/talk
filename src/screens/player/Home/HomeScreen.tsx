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

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedCourt, setSelectedCourt] = useState<string>('Корт №3');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const courts = ['Корт №1', 'Корт №2', 'Корт №3', 'Корт №4'];

  const handleBooking = () => {
    console.log('Забронированы слоты:', selectedSlots);
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
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <TimePicker
              onSelectionChange={(slots: string[]) => setSelectedSlots(slots)}
            />
          </View>
        </ScrollView>

        {selectedSlots.length > 0 && (
  <BlurView intensity={70} tint="light" style={styles.bookButtonWrapper} >
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