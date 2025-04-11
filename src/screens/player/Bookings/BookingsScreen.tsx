import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BookingConfirmation from '@components/BookingConfirmation';
import Button from '@components/Button';
import Screen from '@components/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useBookings } from '../../../context/BookingContext';
import { getBooking } from '../../../api/bookings';
import moment from 'moment';

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
    price?: number | string; // Цена может быть числом или строкой
    bookingId?: number;
  };
  BookingSuccess: { court: string; court_id: number; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type BookingsScreenProps = StackScreenProps<RootStackParamList, 'Bookings'>;

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation, route }) => {
  const { court, court_id, date, time, status, fromMyBookings, selectedSlots, price: rawPrice = 1500, bookingId } = route.params || {};
  const { addBookings } = useBookings();

  // Нормализуем и валидируем дату
  const effectiveDate = React.useMemo(() => {
    const defaultDate = '2025-04-11'; // Текущая дата из логов
    if (!date) {
      console.log('Дата не определена, используется по умолчанию:', defaultDate);
      return defaultDate;
    }

    const parsedDate = moment(date, 'YYYY-MM-DD', true);
    if (!parsedDate.isValid()) {
      console.log(`Неверный формат даты: ${date}, используется по умолчанию: ${defaultDate}`);
      return defaultDate;
    }

    return date;
  }, [date]);

  // Нормализуем и валидируем цену
  const price = React.useMemo(() => {
    if (typeof rawPrice === 'number') return rawPrice;

    // Если цена - строка, убираем нечисловые символы (например, "1500 ₽" -> "1500")
    const cleanedPrice = typeof rawPrice === 'string' ? rawPrice.replace(/[^0-9]/g, '') : rawPrice;
    const parsedPrice = Number(cleanedPrice);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      console.log(`Неверная цена: ${rawPrice}, используется по умолчанию: 1500`);
      return 1500; // Значение по умолчанию
    }

    return parsedPrice;
  }, [rawPrice]);

  const handleDownload = async () => {
    try {
      let bookingData = {
        court: court || 'Корт №3',
        date: effectiveDate,
        time: time || '17:00-18:00',
        status: status || 'active',
        price: price,
        name: 'John Doe',
      };

      if (bookingId) {
        const booking = await getBooking(bookingId);
        bookingData = {
          court: booking.court || court || 'Корт №3',
          date: moment(booking.start_time).format('YYYY-MM-DD'),
          time: `${moment(booking.start_time).format('HH:mm')}-${moment(booking.end_time).format('HH:mm')}`,
          status: booking.status,
          price: booking.price,
          name: booking.user_name || 'John Doe',
        };
      }

      const htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Бронирование корта</h1>
            <p><strong>Корт:</strong> ${bookingData.court}</p>
            <p><strong>Дата:</strong> ${moment(bookingData.date, 'YYYY-MM-DD').format('DD.MM.YYYY')}</p>
            <p><strong>Время:</strong> ${bookingData.time}</p>
            <p><strong>Статус:</strong> ${bookingData.status === 'active' ? 'Активно' : 'Отменено'}</p>
            <p><strong>Имя:</strong> ${bookingData.name}</p>
            <p><strong>Цена:</strong> ${bookingData.price} ₽</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent, base64: false });
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
      console.error('Не удалось создать или поделиться PDF:', error);
      Alert.alert('Ошибка', 'Не удалось создать или сохранить PDF');
    }
  };

  const handleConfirm = async () => {
    try {
      const effectiveSlots = selectedSlots || [time || '20:00-21:00'];

      for (const slot of effectiveSlots) {
        const [startTime, endTime] = slot.split('-');
        if (!startTime || !endTime || !moment(`${effectiveDate} ${startTime}`, 'YYYY-MM-DD HH:mm').isValid()) {
          throw new Error(`Неверный формат времени: ${slot}. Ожидается HH:MM-HH:MM`);
        }
      }

      const newBookings = effectiveSlots.map((slot) => ({
        court_id: court_id || 3,
        court: court || 'Корт №3',
        date: effectiveDate,
        time: slot,
        price: price, // Используем нормализованную цену
      }));

      await addBookings(newBookings);

      navigation.navigate('BookingSuccess', {
        court: court || 'Корт №3',
        court_id: court_id || 3,
        date: effectiveDate,
        selectedSlots: effectiveSlots,
        status: 'success',
      });
    } catch (error: any) {
      console.error('Не удалось создать бронирование:', error.message || error);
      Alert.alert('Ошибка', error.message || 'Не удалось создать бронирование');
      navigation.navigate('BookingSuccess', {
        court: court || 'Корт №3',
        court_id: court_id || 3,
        date: effectiveDate,
        selectedSlots: selectedSlots || [time || '20:00-21:00'],
        status: 'error',
      });
    }
  };

  return (
    <Screen noPaddingTop={true}>
      <View style={styles.container}>
        <BookingConfirmation
          court={court || 'Корт №3'}
          date={moment(effectiveDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}
          name="John Doe"
          time={time || '20:00-21:00'}
          price={`${price} ₽`} // Отображаем с символом валюты
        />

        <View style={styles.buttonContainer}>
          {fromMyBookings ? (
            <Button title="Скачать" onPress={handleDownload} variant="primary" />
          ) : (
            <Button title="Оплатить" onPress={handleConfirm} variant="primary" />
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