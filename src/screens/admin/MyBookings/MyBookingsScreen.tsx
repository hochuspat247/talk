import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import BookingCard from '@components/BookingCard';
import Screen from '@components/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import { useBookings } from '../../../context/BookingContext';
import BottomNavigator from '@components/BottomNavigator';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type MyBookingsScreenProps = StackScreenProps<RootStackParamList, 'MyBookings'>;

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation }) => {
  const { bookings } = useBookings();

  // Заглушки для userName и isAdmin
  const userName = 'Иван Г.'; // Заглушка для имени покупателя
  const isAdmin = true; // Заглушка для флага администратора

  const handleCardPress = (booking: { court: string; date: string; time: string; status: 'active' | 'canceled' }) => {
    navigation.navigate('Bookings', {
      court: booking.court,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      fromMyBookings: true,
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen noPaddingTop={true}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <TouchableOpacity key={index} onPress={() => handleCardPress(booking)}>
                  <BookingCard
                    court={booking.court}
                    date={booking.date}
                    time={booking.time}
                    status={booking.status}
                    userName={userName} // Передаем заглушку для имени
                    isAdmin={isAdmin} // Передаем заглушку для флага администратора
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