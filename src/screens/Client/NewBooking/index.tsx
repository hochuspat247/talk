import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '@components/Layout/Screen';
import BookingForm from './BookingForm';
import styles from './styled';
import { ClientStackParamList } from '@navigation/ClientNavigator';
import { FormState, Location } from './types';
import { mockMonthlyAvailability } from '@mocks/mockData';

type NavigationProp = NativeStackNavigationProp<ClientStackParamList, 'NewBooking'>;

const NewBookingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    serviceName: '',
    clientFilters: {},
    comment: '',
    address: '',
  });

  const handleSelectLocation = (location: Location) => {
    setFormState((prev) => ({ ...prev, address: location.address }));
  };

  const handleConfirm = () => {
    console.log('Form submitted:', formState, selectedDate, selectedSlot);
  };

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BookingForm
            formState={formState}
            setFormState={setFormState}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            availability={mockMonthlyAvailability}
            onConfirm={handleConfirm}
            onOpenMap={() => navigation.navigate('MapScreen', { onSelectLocation })}
          />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
};

export default NewBookingScreen;