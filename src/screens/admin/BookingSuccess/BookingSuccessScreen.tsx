import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BookingCard from '@components/BookingCard';
import Button from '@components/Button';
import Screen from '@components/Screen';
import { BlurView } from 'expo-blur';
import { StackScreenProps } from '@react-navigation/stack';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; name: string; time: string; price: string; selectedSlots: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  Profile: undefined;
};

type BookingSuccessScreenProps = StackScreenProps<RootStackParamList, 'BookingSuccess'>;

const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ navigation, route }) => {
  const { court, date, selectedSlots, status } = route.params || {
    court: 'Корт №3',
    date: '20.01.2025',
    selectedSlots: [],
    status: 'success',
  };

  // Заглушки для name и isAdmin
  const userName = 'Иван Г.'; // Заглушка для имени покупателя
  const isAdmin = true; // Заглушка для флага администратора

  const handleGoHome = () => {
    navigation.navigate('Home');
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
          {selectedSlots.length > 0 ? (
            selectedSlots.map((slot, index) => (
              <BookingCard
                key={index}
                court={court}
                date={date}
                time={slot}
                status={status === 'success' ? 'active' : 'canceled'}
                userName={userName} // Передаем заглушку для имени
                isAdmin={isAdmin} // Передаем заглушку для флага администратора
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