import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import BookingCard from '@components/BookingCard';
import Screen from '@components/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import BottomNavigator from '@components/BottomNavigator';
import { getMyBookings } from '@api/bookings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking } from '@api/types';
import moment from 'moment-timezone';

// Устанавливаем таймзону
moment.tz.setDefault('Europe/Moscow');

type RootStackParamList = {
  Home: undefined;
  Bookings: {
    court: string;
    date: string;
    time: string;
    status: 'active' | 'canceled';
    fromMyBookings?: boolean;
    selectedSlots?: string[];
  };
  BookingSuccess: {
    court: string;
    date: string;
    selectedSlots: string[];
    status: 'success' | 'error';
  };
  MyBookings: undefined;
  Profile: undefined;
};

type MyBookingsScreenProps = StackScreenProps<RootStackParamList, 'MyBookings'>;

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      console.log('Retrieved userId from AsyncStorage:', userId);
      if (!userId) throw new Error('User ID not found');

      const data = await getMyBookings(Number(userId));
      console.log('Raw bookings data from API:', data);

      // Преобразуем данные для карточек
      const transformed = data.map((b, index) => {
        // Логируем исходные временные данные
        console.log(`Booking ${index} raw start_time: ${b.start_time}, end_time: ${b.end_time}`);

        // Преобразуем время в локальное (Europe/Moscow)
        const start = moment(b.start_time).tz('Europe/Moscow');
        const end = moment(b.end_time).tz('Europe/Moscow');

        // Логируем преобразованные временные данные
        console.log(`Booking ${index} parsed start: ${start.format('YYYY-MM-DD HH:mm:ss')}, end: ${end.format('YYYY-MM-DD HH:mm:ss')}`);

        const transformedBooking = {
          ...b,
          date: start.format('YYYY-MM-DD'), // YYYY-MM-DD
          time: `${start.format('HH:mm')}-${end.format('HH:mm')}`, // HH:MM-HH:MM
          court: `Корт №${b.court_id}`, // Пример, если нет поля court.name
        };

        // Логируем итоговые данные для карточки
        console.log(`Booking ${index} transformed:`, transformedBooking);

        return transformedBooking;
      });

      setBookings(transformed);
      console.log('Transformed bookings set:', transformed);
    } catch (err) {
      console.error('Ошибка загрузки бронирований:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCardPress = (booking: Booking) => {
    console.log('Navigating to Bookings with booking:', booking);
    navigation.navigate('Bookings', {
      court: booking.court ?? '',
      date: booking.date ?? '',
      time: booking.time ?? '',
      status: booking.status,
      fromMyBookings: true,
    });
  };

  const onRefresh = () => {
    console.log('Refreshing bookings...');
    setRefreshing(true);
    fetchBookings();
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