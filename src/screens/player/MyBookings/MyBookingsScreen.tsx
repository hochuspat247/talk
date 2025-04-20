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
      if (!userId) throw new Error('User ID not found');

      const data = await getMyBookings(Number(userId));

      // Преобразуем данные для карточек
      const transformed = data.map((b) => {
        const start = new Date(b.start_time);
        const end = new Date(b.end_time);
        return {
          ...b,
          date: start.toISOString().slice(0, 10), // YYYY-MM-DD
          time: `${start.toTimeString().slice(0, 5)}-${end.toTimeString().slice(0, 5)}`, // HH:MM-HH:MM
          court: `Корт №${b.court_id}`, // Пример, если нет поля court.name
        };
      });

      setBookings(transformed);
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
    navigation.navigate('Bookings', {
      court: booking.court ?? '',
      date: booking.date ?? '',
      time: booking.time ?? '',
      status: booking.status,
      fromMyBookings: true,
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen noPaddingTop={true}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchBookings} />}
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
