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
  Bookings: { court: string; date: string; name: string; time: string; price: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type BookingsScreenProps = StackScreenProps<RootStackParamList, 'Bookings'>;

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation, route }) => {
  const { court, date, name, time, price, status, fromMyBookings, selectedSlots } = route.params || {};
  const { addBookings, removeBooking } = useBookings();

  const handleDownload = async () => {
    try {
      const htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Бронирование корта</h1>
            <p><strong>Корт:</strong> ${court || 'Корт №3'}</p>
            <p><strong>Дата:</strong> ${date || '20.01.2025'}</p>
            <p><strong>Время:</strong> ${time || '17:00-18:00'}</p>
            <p><strong>Статус:</strong> ${status === 'active' ? 'Активно' : 'Отменено'}</p>
            <p><strong>Имя:</strong> ${name || 'Иванов Иван'}</p>
            <p><strong>Цена:</strong> ${price || '1500 ₽'}</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
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

  const handleDelete = () => {
    Alert.alert(
      'Удалить бронирование',
      'Вы уверены, что хотите удалить это бронирование?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            // Удаляем бронирование из контекста
            removeBooking({ court, date, time, status });
            // Возвращаемся на MyBookingsScreen
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleConfirm = () => {
    console.log('Booking confirmed');
    const bookingStatus = Math.random() > 0.5 ? 'success' : 'error';

    const newBookings = selectedSlots.map((slot) => ({
      court: court || 'Корт №3',
      date: date || '20.01.2025',
      time: slot,
      status: bookingStatus === 'success' ? 'active' : 'canceled',
    }));

    addBookings(newBookings);

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
        <BookingConfirmation
          court={court || 'Корт №3'}
          date={date || '20.01.2025'}
          name={name || 'Иванов Иван'}
          time={time || '17:00-18:00'}
          price={price || '1500 ₽'}
        />

        <View style={styles.buttonContainer}>
        {fromMyBookings ? (
  <View style={styles.buttonRow}>   
   <Button
      title="Удалить"
      onPress={handleDelete}
      variant="error" // Используем красный стиль
      style={styles.button}
    />
    <Button
      title="Скачать"
      onPress={handleDownload}
      variant="primary"
      style={styles.button}
    />

  </View>
) : (
  <Button
    title="Забронировать"
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
    bottom: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%', // Каждая кнопка занимает половину ширины с учётом отступов
  },
});

export default BookingsScreen;