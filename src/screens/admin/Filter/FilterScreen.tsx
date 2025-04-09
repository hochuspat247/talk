import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import ContactCard from '@components/ContactCard';
import Button from '@components/Button';
import { Calendar } from 'react-native-calendars';
import { BlurView } from 'expo-blur';
import Screen from '@components/Screen';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  FilterScreen: { onApplyFilters: (filters: FilterData) => void };
  Profile: undefined;
};

// Тип для данных фильтра
type FilterData = {
  dateFrom: string;
  dateTo: string;
  court: string;
  users: { id: string; name: string }[];
};

type FilterScreenProps = StackScreenProps<RootStackParamList, 'FilterScreen'>;

// Список пользователей (заглушка, в реальном приложении это может быть из API)
const users = [
  { id: '1', name: 'Шалонова Арина', phone: '89181027722', photo: 'https://example.com/photo1.jpg' },
  { id: '2', name: 'Иванов Сергей', phone: '89291234567' },
  { id: '3', name: 'Петрова Мария', phone: '89031237890' },
  { id: '4', name: 'Сидоров Алексей', phone: '89161239012' },
  { id: '5', name: 'Козлова Ольга', phone: '89321234567' },
  { id: '6', name: 'Михайлов Павел', phone: '89051239876' },
  { id: '7', name: 'Смирнова Екатерина', phone: '89171234567' },
];

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, route }) => {
  const { onApplyFilters } = route.params;

  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<string>('Корт №1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<{ id: string; name: string }[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarField, setCalendarField] = useState<'dateFrom' | 'dateTo' | null>(null);

  const courts = ['Корт №1', 'Корт №2', 'Корт №3'];

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  const handleSelectUser = (userId: string, userName: string) => {
    const isAlreadySelected = selectedUsers.some((user) => user.id === userId);
    if (isAlreadySelected) {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, { id: userId, name: userName }]);
      setSearchQuery('');
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      dateFrom,
      dateTo,
      court: selectedCourt,
      users: selectedUsers,
    });
    navigation.goBack();
  };

  const handleDateSelect = (day: { dateString: string }) => {
    if (calendarField === 'dateFrom') {
      setDateFrom(day.dateString);
      setCalendarField('dateTo');
    } else if (calendarField === 'dateTo') {
      setDateTo(day.dateString);
      setShowCalendar(false);
      setCalendarField(null);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen noPaddingTop={true}>

        <View style={styles.container}>
          <ScrollView >
            <Text style={styles.label}>Период</Text>
            <View style={styles.dateRangeContainer}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setCalendarField('dateFrom');
                  setShowCalendar(true);
                }}
              >
                <Text style={styles.dateButtonText}>{dateFrom ? formatDate(dateFrom) : 'от'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setCalendarField('dateTo');
                  setShowCalendar(true);
                }}
              >
                <Text style={styles.dateButtonText}>{dateTo ? formatDate(dateTo) : 'до'}</Text>
              </TouchableOpacity>
            </View>

            {showCalendar && (
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                  [dateFrom]: { selected: true, startingDay: true, color: '#007AFF' },
                  [dateTo]: { selected: true, endingDay: true, color: '#007AFF' },
                }}
                markingType={'period'}
                style={styles.calendar}
              />
            )}

            <Text style={styles.label}>Корт</Text>
            <View style={styles.courtSelector}>
              {courts.map((court) => (
                <TouchableOpacity
                  key={court}
                  style={[
                    styles.courtButton,
                    selectedCourt === court && styles.courtButtonSelected,
                  ]}
                  onPress={() => setSelectedCourt(court)}
                >
                  <Text
                    style={[
                      styles.courtButtonText,
                      selectedCourt === court && styles.courtButtonTextSelected,
                    ]}
                  >
                    {court}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Покупатель</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Введите имя или номер телефона"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {searchQuery.length > 0 && (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.usersList}>
                {filteredUsers.map((user) => (
                  <ContactCard
                    key={user.id}
                    photo={user.photo}
                    name={user.name}
                    phone={user.phone}
                    onAddPress={() => handleSelectUser(user.id, user.name)}
                    isSelected={selectedUsers.some((u) => u.id === user.id)}
                    isDisabled={false}
                  />
                ))}
              </ScrollView>
            )}

            {selectedUsers.length > 0 && (
              <View style={styles.selectedUsersContainer}>
                {selectedUsers.map((user) => (
                  <View key={user.id} style={styles.selectedUser}>
                    <Text style={styles.selectedUserText}>{user.name}</Text>
                    <TouchableOpacity onPress={() => handleRemoveUser(user.id)}>
                      <Ionicons name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <BlurView intensity={100} style={styles.buttonContainer}>
            <View style={{ width: '100%' }}>
              <Button
                title="Применить"
                onPress={handleApplyFilters}
                variant="primary"
              />
            </View>
          </BlurView>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#888',
  },
  calendar: {
    marginBottom: 20,
  },
  courtSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  courtButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 6,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  courtButtonSelected: {
    backgroundColor: '#195cc5',
  },
  courtButtonText: {
    fontSize: 15,
    color: '#000',
  },
  courtButtonTextSelected: {
    color: '#fff',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  usersList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  selectedUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  selectedUser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#195cc5',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedUserText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 1,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(217, 217, 217, 0.9)',
  },
});

export default FilterScreen;