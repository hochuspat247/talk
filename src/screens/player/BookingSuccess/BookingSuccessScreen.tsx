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
                  ? require('../../../../assets/icons/check-icon.png') // Иконка для успеха
                  : require('../../../../assets/icons/error-icon.png') // Иконка для ошибки
              }
              style={styles.checkIcon}
            />
            <Text style={styles.successText}>
              {status === 'success' ? 'Заказ оплачен' : 'Заказ не оплачен'}
            </Text>
          </View>
          {selectedSlots.length > 0 ? (
            selectedSlots.map((slot, index) => (
              <BookingCard
                key={index}
                court={court}
                date={date}
                time={slot} // Передаем отдельный слот
                status={status === 'success' ? 'active' : 'canceled'} // Передаем статус
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
    paddingBottom: 150, // Отступ снизу, чтобы карточки не перекрывались кнопкой
  },
  noBookingsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  bookButtonWrapper: {
    position: 'absolute',
    bottom: 1, // высота BottomNavigator + небольшой отступ
    height: 100,
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(217, 217, 217, 0.9)',
  },
});

export default BookingSuccessScreen;