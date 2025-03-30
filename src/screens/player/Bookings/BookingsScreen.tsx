import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BookingConfirmation from '@components/BookingConfirmation';
import Button from '@components/Button';
import Screen from '@components/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useBookings } from '../../../context/BookingContext';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type BookingsScreenProps = StackScreenProps<RootStackParamList, 'Bookings'>;

// Явно указываем, что BookingsScreen — это React.FC с типом BookingsScreenProps
const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation, route }) => {
  const { court, date, time, status, fromMyBookings, selectedSlots } = route.params || {};
  const { addBookings } = useBookings();

  const handleDownload = async () => {
    try {
      // Создаем HTML-контент для PDF
      const htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Бронирование корта</h1>
            <p><strong>Корт:</strong> ${court || 'Корт №3'}</p>
            <p><strong>Дата:</strong> ${date || '20.01.2025'}</p>
            <p><strong>Время:</strong> ${time || '17:00-18:00'}</p>
            <p><strong>Статус:</strong> ${status === 'active' ? 'Активно' : 'Отменено'}</p>
            <p><strong>Имя:</strong> Иванов Иван</p>
            <p><strong>Цена:</strong> 1500 ₽</p>
          </body>
        </html>
      `;

      // Создаем PDF с помощью expo-print
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Проверяем, доступно ли скачивание/поделиться
      if (await Sharing.isAvailableAsync()) {
        // Открываем диалог для сохранения/поделиться
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Сохранить PDF',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('Ошибка', 'Сохранение PDF недоступно на этом устройстве');
      }
    } catch (error) {
      console.error('Failed to create or share PDF:', error);
      Alert.alert('Ошибка', 'Не удалось создать или сохранить PDF');
    }
  };

  const handleConfirm = () => {
    console.log('Booking confirmed');
    // Пример: определяем статус бронирования (можно заменить на реальную логику)
    const bookingStatus = Math.random() > 0.5 ? 'success' : 'error'; // Случайный выбор для примера

    // Создаем массив новых бронирований
    const newBookings = selectedSlots.map((slot) => ({
      court: court || 'Корт №3',
      date: date || '20.01.2025',
      time: slot,
      status: bookingStatus === 'success' ? 'active' : 'canceled',
    }));

    // Добавляем все бронирования за один раз
    addBookings(newBookings);

    // Переходим на BookingSuccessScreen с данными о бронировании
    navigation.navigate('BookingSuccess', {
      court: court || 'Корт №3',
      date: date || '20.01.2025',
      selectedSlots: selectedSlots || ['17:00-18:00', '18:00-19:00'],
      status: bookingStatus,
    });
  };

  return (
    <Screen noPaddingTop={true}>
      <View style={styles.container}>
        {/* Компонент BookingConfirmation с переданными данными */}
        <BookingConfirmation
          court={court || 'Корт №3'}
          date={date || '20.01.2025'}
          name="Иванов Иван"
          time={time || '17:00-18:00'}
          price="1500 ₽" // Можно сделать динамическим, если нужно
        />

        {/* Контейнер для кнопки внизу */}
        <View style={styles.buttonContainer}>
          {fromMyBookings ? (
            <Button
              title="Скачать"
              onPress={handleDownload}
              variant="primary"
            />
          ) : (
            <Button
              title="Оплатить"
              onPress={handleConfirm}
              variant="primary"
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,

  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 22,
  },
});

export default BookingsScreen;