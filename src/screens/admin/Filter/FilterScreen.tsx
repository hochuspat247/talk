import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import ContactCard from '@components/ContactCard';
import Button from '@components/UI/Button';
import { Calendar } from 'react-native-calendars';
import { BlurView } from 'expo-blur';
import Screen from '@components/Screen';
import { getAllCourts } from '@api/courts';
import { getProfile } from '@api/profile';
import { getAllUsers } from '@api/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Court, User } from '@api/types';
import moment from 'moment-timezone';

// Устанавливаем таймзону
moment.tz.setDefault('Europe/Moscow');

type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: { filters?: FilterData };
  FilterScreen: { filters?: FilterData };
  Profile: undefined;
  SelectUser: { court: string; court_id: number; date: string; time: string; price: string; selectedSlots: string[] };
  ProfileOptions: undefined;
  Register: undefined;
  AccountCreated: undefined;
};

type FilterData = {
  dateFrom?: string; // YYYY-MM-DD, необязательный
  dateTo?: string; // YYYY-MM-DD, необязательный
  court: string;
  userIds: number[];
};

type FilterScreenProps = StackScreenProps<RootStackParamList, 'FilterScreen'>;

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, route }) => {
  const initialFilters = route.params?.filters;
  const [dateFrom, setDateFrom] = useState<string>(initialFilters?.dateFrom || '');
  const [dateTo, setDateTo] = useState<string>(initialFilters?.dateTo || '');
  const [selectedCourt, setSelectedCourt] = useState<string>(initialFilters?.court || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<{ id: number; name: string }[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarField, setCalendarField] = useState<'dateFrom' | 'dateTo' | null>(null);
  const [courts, setCourts] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка кортов и пользователей
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Проверка, что пользователь — админ
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('Идентификатор пользователя не найден');
        const user = await getProfile(Number(userId));
        if (user.role !== 'admin') throw new Error('Пользователь не является администратором');

        // Загрузка кортов
        const courtsData: Court[] = await getAllCourts();
        const courtNames = courtsData.map((court) => court.name);
        setCourts(courtNames);
        if (!selectedCourt && courtNames.length > 0) setSelectedCourt(courtNames[0]);

        // Загрузка пользователей
        const usersData: User[] = await getAllUsers();
        setUsers(usersData);

        // Инициализация выбранных пользователей из фильтров
        if (initialFilters?.userIds && initialFilters.userIds.length > 0) {
          const selected = usersData
            .filter((user) => initialFilters.userIds.includes(user.id))
            .map((user) => ({
              id: user.id,
              name: formatUserName(user),
            }));
          setSelectedUsers(selected);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить корты или пользователей');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialFilters]);

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  const handleSelectUser = (userId: number, userName: string) => {
    const isAlreadySelected = selectedUsers.some((user) => user.id === userId);
    if (isAlreadySelected) {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, { id: userId, name: userName }]);
      setSearchQuery('');
    }
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleApplyFilters = () => {
    // Валидация формата дат, если они указаны
    if (dateFrom && !moment(dateFrom, 'YYYY-MM-DD', true).isValid()) {
      Alert.alert('Ошибка', 'Выберите корректную дату начала периода');
      return;
    }
    if (dateTo && !moment(dateTo, 'YYYY-MM-DD', true).isValid()) {
      Alert.alert('Ошибка', 'Выберите корректную дату окончания периода');
      return;
    }
    if (dateFrom && dateTo && moment(dateFrom).isAfter(dateTo)) {
      Alert.alert('Ошибка', 'Дата начала не может быть позже даты окончания');
      return;
    }
    if (!selectedCourt) {
      Alert.alert('Ошибка', 'Выберите корт');
      return;
    }

    const filters: FilterData = {
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      court: selectedCourt,
      userIds: selectedUsers.map((user) => user.id),
    };

    console.log('Применение фильтров:', filters);

    // Переходим на MyBookings с фильтрами
    navigation.navigate('MyBookings', { filters });
  };

  const handleResetFilters = () => {
    // Очищаем все поля фильтров
    setDateFrom('');
    setDateTo('');
    setSelectedCourt(courts[0] || '');
    setSelectedUsers([]);
    setSearchQuery('');

    // Переходим на MyBookings без фильтров
    navigation.navigate('MyBookings', { filters: undefined });
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
    return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
  };

  // Форматирование имени в "Имя Ф."
  const formatUserName = (user: User) => {
    return `${user.first_name} ${user.last_name.charAt(0)}.`;
  };

  const isFiltered = initialFilters && (
    initialFilters.dateFrom ||
    initialFilters.dateTo ||
    initialFilters.court ||
    initialFilters.userIds.length > 0
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen noPaddingTop={true}>
        <View style={styles.container}>
          {loading ? (
            <Text style={styles.loadingText}>Загрузка...</Text>
          ) : (
            <ScrollView>
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
                      name={formatUserName(user)}
                      phone={user.phone}
                      onAddPress={() => handleSelectUser(user.id, formatUserName(user))}
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
          )}

          <BlurView intensity={100} style={styles.buttonContainer}>
            <View style={{ width: '100%' }}>
              <Button
                title={isFiltered ? 'Сбросить' : 'Применить'}
                onPress={isFiltered ? handleResetFilters : handleApplyFilters}
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
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FilterScreen;