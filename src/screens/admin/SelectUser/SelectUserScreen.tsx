import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ContactCard from '@components/ContactCard';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

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

type SelectUserScreenProps = StackScreenProps<RootStackParamList, 'SelectUser'>;

// Список пользователей с разными данными
const users = [
  { id: '1', name: 'Шалонова Арина', phone: '89181027722', photo: 'https://example.com/photo1.jpg' }, // У этого пользователя есть фото
  { id: '2', name: 'Иванов Сергей', phone: '89291234567' }, // Без фото
  { id: '3', name: 'Петрова Мария', phone: '89031237890' }, // Без фото
  { id: '4', name: 'Сидоров Алексей', phone: '89161239012' }, // Без фото
  { id: '5', name: 'Козлова Ольга', phone: '89321234567' }, // Без фото
  { id: '6', name: 'Михайлов Павел', phone: '89051239876' }, // Без фото
  { id: '7', name: 'Смирнова Екатерина', phone: '89171234567' }, // Без фото
];

const SelectUserScreen: React.FC<SelectUserScreenProps> = ({ navigation, route }) => {
  const { court, date, time, price, selectedSlots } = route.params;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  const handleBooking = () => {
    if (!selectedUserId) {
      alert('Пожалуйста, выберите пользователя');
      return;
    }

    const selectedUserData = users.find((user) => user.id === selectedUserId);
    if (selectedUserData) {
      navigation.navigate('Bookings', {
        court,
        date,
        name: selectedUserData.name,
        time,
        price,
        selectedSlots,
        fromMyBookings: false,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Введите имя или номер телефона"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredUsers.map((user) => (
            <ContactCard
              key={user.id}
              photo={user.photo} // Передаем photo, если есть, иначе будет дефолтное
              name={user.name}
              phone={user.phone}
              onAddPress={() => handleSelectUser(user.id)}
              isSelected={selectedUserId === user.id}
              isDisabled={!!selectedUserId}
            />
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Забронировать"
            onPress={handleBooking}
            variant="primary"
            disabled={!selectedUserId}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,

  },
  buttonContainer: {
    padding: 20,
  },
});

export default SelectUserScreen;