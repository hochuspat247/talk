import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BookingCard from '@components/BookingCard';
import Button from '@components/Button';
import Screen from '@components/Screen';
import { BlurView } from 'expo-blur';
import { StackScreenProps } from '@react-navigation/stack';
import { getBooking, Booking } from '@api/bookings';
import { getProfile } from '@api/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';

// Устанавливаем таймзону
moment.tz.setDefault('Europe/Moscow');

type RootStackParamList = {
  Home: undefined;
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    name?: string;
    time: string;
    price?: string | number;
    status?: 'active' | 'canceled';
    fromMyBookings?: boolean;
    selectedSlots?: string[];
    bookingId?: number;
    user_id?: number;
  };
  BookingSuccess: {
    court: string;
    court_id: number;
    date: string;
    selectedSlots: string[];
    status: 'success' | 'error';
    bookingIds: number[];
    user_name?: string; // Сделали опциональным
  };
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

type BookingSuccessScreenProps = StackScreenProps<RootStackParamList, 'BookingSuccess'>;

const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ navigation, route }) => {
  const { court, court_id, date, selectedSlots, status, bookingIds, user_name } = route.params || {
    court: 'Корт №3',
    court_id: 3,
    date: moment().format('DD.MM.YYYY'),
    selectedSlots: [],
    status: 'success',
    bookingIds: [],
    user_name: undefined,
  };
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Загрузка данных о бронированиях и роли админа
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Проверка роли админа
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const user = await getProfile(Number(userId));
          setIsAdmin(user.role === 'admin');
        }

        // Загрузка бронирований
        if (bookingIds.length > 0) {
          const bookingPromises = bookingIds.map((id) => getBooking(id));
          const bookingData = await Promise.all(bookingPromises);
          console.log('Загружены бронирования:', bookingData);
          setBookings(bookingData);
        }
      } catch (error: any) {
        console.error('Ошибка при загрузке данных:', error);
        Alert.alert('Ошибка', error.message || 'Не удалось загрузить данные бронирований');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingIds]);

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  // Функция для безопасной фильтрации имени
  const getSafeUserName = (bookingUserName?: string, fallbackUserName?: string) => {
    const name = bookingUserName || fallbackUserName || 'Неизвестный';
    return name.replace(/[^a-zA-ZА-Яа-я\s.]/g, '');
  };

  return (
    <Screen noPaddingTop={true}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.successContainer}>
            <Image
              source={
                status === 'success'
                  ? require('../../../../assets/icons/check-icon.png')
                  : require('../../../../assets/icons/error-icon.png')
              }
              style={styles.checkIcon}
            />
            <Text style={styles.successText}>
              {status === 'success' ? 'Забронировано' : 'Ошибка бронирования'}
            </Text>
          </View>
          {loading ? (
            <Text style={styles.noBookingsText}>Загрузка...</Text>
          ) : bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <BookingCard
                key={index}
                court={booking.court || court}
                date={moment(booking.start_time).format('DD.MM.YYYY')}
                time={`${moment(booking.start_time).format('HH:mm')}-${moment(booking.end_time).format('HH:mm')}`}
                status={booking.status}
                userName={getSafeUserName(booking.user_name, user_name)}
                isAdmin={isAdmin}
              />
            ))
          ) : selectedSlots.length > 0 ? (
            selectedSlots.map((slot, index) => (
              <BookingCard
                key={index}
                court={court}
                date={moment(date, ['YYYY-MM-DD', 'DD.MM.YYYY']).format('DD.MM.YYYY')}
                time={slot}
                status={status === 'success' ? 'active' : 'canceled'}
                userName={getSafeUserName(undefined, user_name)}
                isAdmin={isAdmin}
              />
            ))
          ) : (
            <Text style={styles.noBookingsText}>Нет бронирований для отображения</Text>
          )}
        </ScrollView>
        <BlurView intensity={100} style={styles.bookButtonWrapper}>
          <View style={{ width: '100%' }}>
            <Button
              title="На главную"
              onPress={handleGoHome}
              variant="primary"
            />
          </View>
        </BlurView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 30,
    marginBottom: 80,
  },
  checkIcon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  successText: {
    fontSize: 22,
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 150,
  },
  noBookingsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  bookButtonWrapper: {
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

export default BookingSuccessScreen;