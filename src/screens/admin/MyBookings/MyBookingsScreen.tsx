import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, RefreshControl } from 'react-native';
import BookingCard from '@components/BookingCard';
import Screen from '@components/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import BottomNavigator from '@components/BottomNavigator';
import { getAllBookings, filterBookings } from '@api/bookings';
import { getAllCourts } from '@api/courts';
import { getProfile } from '@api/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, User, Court } from '@api/types';
import moment from 'moment-timezone';
import { Alert } from 'react-native';

// Устанавливаем таймзону
moment.tz.setDefault('Europe/Moscow');

type RootStackParamList = {
  Home: undefined;
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    time: string;
    status: 'active' | 'canceled';
    fromMyBookings?: boolean;
    selectedSlots?: string[];
    bookingId?: number;
    user_id?: number;
  };
  BookingSuccess: { court: string; court_id: number; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: { filters?: FilterData };
  FilterScreen: { filters?: FilterData };
  Profile: undefined;
  SelectUser: { court: string; court_id: number; date: string; time: string; price: string; selectedSlots: string[] };
  ProfileOptions: undefined;
  Register: undefined;
  AccountCreated: undefined;
};

type FilterData = {
  dateFrom?: string;
  dateTo?: string;
  court: string;
  userIds: number[];
};

type MyBookingsScreenProps = StackScreenProps<RootStackParamList, 'MyBookings'>;

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation, route }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [courtMap, setCourtMap] = useState<Map<number, string>>(new Map());
  const [currentFilters, setCurrentFilters] = useState<FilterData | undefined>(route.params?.filters);

  // Получение бронирований (все или отфильтрованные)
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('Идентификатор пользователя не найден');

      // Проверяем, что пользователь — администратор
      const user: User = await getProfile(Number(userId));
      if (user.role !== 'admin') {
        throw new Error('Пользователь не является администратором');
      }
      setIsAdmin(true);

      // Загрузка маппинга кортов
      const courtsData: Court[] = await getAllCourts();
      const courtIdToName = new Map(courtsData.map((court) => [court.id, court.name]));
      setCourtMap(courtIdToName);

      let data: Booking[];
      const filters: FilterData | undefined = route.params?.filters || currentFilters;

      if (filters && (filters.dateFrom || filters.dateTo || filters.court || filters.userIds.length > 0)) {
        const filterParams = {
          date_from: filters.dateFrom || undefined,
          date_to: filters.dateTo || undefined,
          court: filters.court || undefined,
          user_ids: filters.userIds.length > 0 ? filters.userIds : undefined,
        };

        console.log('Отправка запроса на фильтрацию:', filterParams);
        data = await filterBookings(filterParams);
        setCurrentFilters(filters);
      } else {
        console.log('Загрузка всех бронирований');
        data = await getAllBookings();
        setCurrentFilters(undefined);
      }

      // Преобразуем данные для BookingCard
      const transformed = data.map((b) => {
        const start = moment(b.start_time);
        const end = moment(b.end_time);
        return {
          ...b,
          date: start.format('DD.MM.YYYY'),
          time: `${start.format('HH:mm')}-${end.format('HH:mm')}`,
          court: courtIdToName.get(b.court_id) ?? `Корт #${b.court_id}`,
          user_name: b.user_name,
        };
      });

      setBookings(transformed);
    } catch (err: any) {
      console.error('Ошибка загрузки бронирований:', err);
      Alert.alert('Ошибка', err.message || 'Не удалось загрузить бронирования');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [route.params?.filters, currentFilters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Обработчик pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookings();
  }, [fetchBookings]);

  // Обработчик нажатия на карточку
  const handleCardPress = (booking: Booking) => {
    console.log('Переход на BookingsScreen с параметрами:', {
      court: booking.court,
      court_id: booking.court_id,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      fromMyBookings: true,
      bookingId: booking.id,
      user_id: booking.user_id,
    });

    navigation.navigate('Bookings', {
      court: booking.court ?? '',
      court_id: booking.court_id,
      date: booking.date ?? '',
      time: booking.time ?? '',
      status: booking.status,
      fromMyBookings: true,
      bookingId: booking.id, // Передаём booking.id
      user_id: booking.user_id,
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen noPaddingTop={true}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {loading ? (
              <Text style={styles.noBookingsText}>Загрузка...</Text>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <TouchableOpacity key={index} onPress={() => handleCardPress(booking)}>
                  <BookingCard
                    court={booking.court ?? ''}
                    date={booking.date ?? ''}
                    time={booking.time ?? ''}
                    status={booking.status}
                    userName={booking.user_name} // Передаём user_name из API
                    isAdmin={isAdmin}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noBookingsText}>Нет бронирований для отображения</Text>
            )}
          </ScrollView>
        </View>
      </Screen>
      <BottomNavigator activeTab="MyBookings" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  noBookingsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyBookingsScreen;