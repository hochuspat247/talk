import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ContactCard from '@components/ContactCard';
import Button from '@components/UI/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { getAllUsers } from '@api/users';
import { User } from '@api/types';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  SelectUser: {
    court: string;
    court_id: number;
    date: string;
    time: string;
    price: string;
    selectedSlots: string[];
  };
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    name: string;
    time: string;
    price: string | number;
    selectedSlots: string[];
    fromMyBookings?: boolean;
    user_id: number;
  };
  BookingSuccess: { court: string; court_id: number; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type SelectUserScreenProps = StackScreenProps<RootStackParamList, 'SelectUser'>;

const SelectUserScreen: React.FC<SelectUserScreenProps> = ({ navigation, route }) => {
  const { court, court_id, date, time, price, selectedSlots } = route.params;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Загрузка пользователей из API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsers();
        console.log('Загружены пользователи:', usersData);
        setUsers(usersData);
      } catch (error: any) {
        console.error('Ошибка при загрузке пользователей:', error);
        Alert.alert('Ошибка', error.message || 'Не удалось загрузить список пользователей');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  // Форматирование имени в "Имя Ф."
  const formatUserName = (user: User) => {
    return `${user.first_name} ${user.last_name.charAt(0)}.`;
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  const handleBooking = () => {
    if (!selectedUserId) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите пользователя');
      return;
    }

    const selectedUserData = users.find((user) => user.id === selectedUserId);
    if (selectedUserData) {
      console.log('Переход на BookingsScreen с параметрами:', {
        court,
        court_id,
        date,
        name: formatUserName(selectedUserData),
        time,
        price,
        selectedSlots,
        fromMyBookings: false,
        user_id: selectedUserData.id,
      });

      navigation.navigate('Bookings', {
        court,
        court_id,
        date,
        name: formatUserName(selectedUserData),
        time,
        price,
        selectedSlots,
        fromMyBookings: false,
        user_id: selectedUserData.id,
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

        {loading ? (
          <Text style={styles.loadingText}>Загрузка...</Text>
        ) : filteredUsers.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredUsers.map((user) => (
              <ContactCard
                key={user.id}
                photo={user.photo}
                name={formatUserName(user)}
                phone={user.phone}
                onAddPress={() => handleSelectUser(user.id)}
                isSelected={selectedUserId === user.id}
                isDisabled={!!selectedUserId && selectedUserId !== user.id}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noUsersText}>Пользователи не найдены</Text>
        )}

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
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  noUsersText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SelectUserScreen;