// NewBookingScreen.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';

import Input from '@components/UI/Input';
import AvailabilityCalendar from '@components/UI/AvailabilityCalendar';
import ClientFilter from '@components/UI/ClientFilter';
import Screen from '@components/Layout/Screen';
import Button from '@components/UI/Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';

import { mockMonthlyAvailability } from '@mocks/mockData';

// Стили
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotCard: {
    width: '23%',
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotCardSelected: {
    backgroundColor: '#F090F1',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#000',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
});

// Типизация для navigation
type NavigationProp = NativeStackNavigationProp<ClientStackParamList, 'NewBooking'>;

// Типизация для состояния формы
interface FormState {
  fullName: string;
  serviceName: string;
  clientFilters: any;
  comment: string;
  address: string; // Добавляем поле для адреса
}

// Моковые данные для свободных слотов
const mockTimeSlots = [
  '11:00', '13:00', '14:00',
  '15:00', '16:00', '18:00', '19:00',
  '20:00', '21:00',
];

// Компонент
const NewBookingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    serviceName: '',
    clientFilters: {},
    comment: '',
    address: '', // Инициализируем поле адреса
  });

  const handleFullNameChange = (text: string) => {
    setFormState((prev) => ({ ...prev, fullName: text }));
  };

  const handleServiceNameChange = (text: string) => {
    setFormState((prev) => ({ ...prev, serviceName: text }));
  };

  const handleAddressChange = (text: string) => {
    setFormState((prev) => ({ ...prev, address: text }));
  };

  const handleCommentChange = (text: string) => {
    setFormState((prev) => ({ ...prev, comment: text }));
  };

  const handleClientFiltersChange = (filters: any) => {
    setFormState((prev) => ({ ...prev, clientFilters: filters }));
  };

  const handleSlotPress = (slot: string) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  const handleConfirm = () => {
    console.log('Form submitted:', formState, selectedDate, selectedSlot);
  };

  // Обработчик выбора адреса с карты
  const handleSelectLocation = useCallback(
    (location: { latitude: number; longitude: number; address: string }) => {
      setFormState((prev) => ({ ...prev, address: location.address }));
    },
    []
  );

  const openMapScreen = () => {
    navigation.navigate('MapScreen', { onSelectLocation: handleSelectLocation });
  };

  const availability = mockMonthlyAvailability;

  const availableTimeSlots = useMemo(() => {
    return mockTimeSlots;
  }, [selectedDate]);

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Поле для имени клиента */}
          <View style={styles.inputContainer}>
            <Input
              value={formState.fullName}
              onChangeText={handleFullNameChange}
              variant="user"
              placeholder="Клиент"
            />
          </View>

          {/* Поле для названия услуги */}
          <View style={styles.inputContainer}>
            <Input
              value={formState.serviceName}
              onChangeText={handleServiceNameChange}
              variant="search"
              placeholder="Введите название услуги"
            />
          </View>

          {/* Календарь */}
          <View style={styles.inputContainer}>
            <AvailabilityCalendar
              availability={availability}
              selectedDate={moment(selectedDate).format('YYYY-MM-DD')}
              onDatePress={(iso) => setSelectedDate(moment(iso, 'YYYY-MM-DD').toDate())}
            />
          </View>

          {/* Свободные временные слоты */}
          <View style={styles.inputContainer}>
            <View style={styles.timeSlotsContainer}>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlotCard,
                      slot === selectedSlot && styles.timeSlotCardSelected,
                    ]}
                    onPress={() => handleSlotPress(slot)}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        slot === selectedSlot && styles.timeSlotTextSelected,
                      ]}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{ color: '#999', textAlign: 'center', width: '100%' }}>
                  Нет свободных слотов на эту дату
                </Text>
              )}
            </View>
          </View>

          {/* Фильтры клиентов */}
          <View style={styles.inputContainer}>
            <ClientFilter
              onChange={handleClientFiltersChange}
              initialValues={formState.clientFilters}
              isNewBooking={true}
            />
          </View>

          {/* Поле для комментария */}
          <View style={styles.inputContainer}>
            <Input
              value={formState.comment}
              onChangeText={handleCommentChange}
              variant="description"
              placeholder="Комментарий"
            />
          </View>

          {/* Кнопка "Да, все верно" */}
          <View style={styles.inputContainer}>
            <Button
              title="Да, все верно"
              onPress={handleConfirm}
              variant="accent"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
};

export default NewBookingScreen;