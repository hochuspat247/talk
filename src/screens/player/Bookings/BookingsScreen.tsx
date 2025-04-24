import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BookingConfirmation from '@components/BookingConfirmation';
import Button from '@components/UI/Button';
import Screen from '@components/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useBookings } from '../../../context/BookingContext';
import { getBooking } from '../../../api/bookings';
import { getProfile } from '../../../api/profile';
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
    time: string;
    status: 'active' | 'canceled';
    fromMyBookings?: boolean;
    selectedSlots?: string[];
    price?: number | string;
    bookingId?: number;
  };
  BookingSuccess: {
    court: string;
    court_id: number;
    date: string;
    selectedSlots: string[];
    status: 'success' | 'error';
    name: string;
  };
  MyBookings: undefined;
  Profile: undefined;
};

type BookingsScreenProps = StackScreenProps<RootStackParamList, 'Bookings'>;

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation, route }) => {
  const { court, court_id, date, time, status, fromMyBookings, selectedSlots, price: rawPrice = 1500, bookingId } = route.params || {};
  const { addBookings } = useBookings();

  // Состояние для имени пользователя
  const [userName, setUserName] = useState('John Doe');

  // Загружаем имя пользователя
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('Retrieved userId from AsyncStorage:', userId);
        if (!userId) {
          console.warn('ID пользователя не найден, используется запасное имя');
          setUserName('John Doe');
          return;
        }

        const user = await getProfile(parseInt(userId));
        console.log('User profile:', user);
        const name = user.first_name ? `${user.first_name} ${user.last_name ? user.last_name[0] + '.' : ''}`.trim() : 'John Doe';
        setUserName(name);
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        setUserName('John Doe');
      }
    };

    fetchUserName();
  }, []);

  // Нормализуем и валидируем дату
  const effectiveDate = React.useMemo(() => {
    const defaultDate = moment().format('YYYY-MM-DD');
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

    const cleanedPrice = typeof rawPrice === 'string' ? rawPrice.replace(/[^0-9]/g, '') : rawPrice;
    const parsedPrice = Number(cleanedPrice);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      console.log(`Неверная цена: ${rawPrice}, используется по умолчанию: 1500`);
      return 1500;
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
        name: userName,
      };

      if (bookingId) {
        const booking = await getBooking(bookingId);
        bookingData = {
          court: booking.court || court || 'Корт №3',
          date: moment(booking.start_time).format('YYYY-MM-DD'),
          time: `${moment(booking.start_time).format('HH:mm')}-${moment(booking.end_time).format('HH:mm')}`,
          status: booking.status,
          price: booking.price,
          name: booking.user_name || userName,
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

      // Валидация временных слотов
      for (const slot of effectiveSlots) {
        const [startTime, endTime] = slot.split('-');
        if (!startTime || !endTime || !moment(`${effectiveDate} ${startTime}`, 'YYYY-MM-DD HH:mm').isValid()) {
          throw new Error(`Неверный формат времени: ${slot}. Ожидается HH:MM-HH:MM`);
        }

        // Проверка, что время в будущем
        const now = moment().tz('Europe/Moscow');
        const startDateTimeMoment = moment(`${effectiveDate} ${startTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow');
        if (startDateTimeMoment.isSameOrBefore(now)) {
          throw new Error('Время бронирования должно быть в будущем');
        }

        // Проверка, что endTime позже startTime
        const endDateTimeMoment = moment(`${effectiveDate} ${endTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow');
        if (endDateTimeMoment.isSameOrBefore(startDateTimeMoment)) {
          throw new Error('Время окончания должно быть позже времени начала');
        }

        // Проверка, что startTime и endTime в одном дне
        if (startDateTimeMoment.date() !== endDateTimeMoment.date()) {
          throw new Error('Бронирование не может пересекать полночь. Начало и конец должны быть в одном дне');
        }
      }

      const newBookings = effectiveSlots.map((slot) => {
        const [startTime, endTime] = slot.split('-');
        // Формируем время в формате YYYY-MM-DD HH:mm:ss без tzinfo для совместимости с бэкендом
        const startDateTime = moment(`${effectiveDate} ${startTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:ss');
        const endDateTime = moment(`${effectiveDate} ${endTime}`, 'YYYY-MM-DD HH:mm').tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:ss');

        return {
          court_id: court_id || 3,
          court: court || 'Корт №3',
          date: effectiveDate,
          time: slot,
          price: price,
          start_time: startDateTime,
          end_time: endDateTime,
        };
      });

      console.log('Отправка бронирований:', newBookings);

      await addBookings(newBookings);

      navigation.navigate('BookingSuccess', {
        court: court || 'Корт №3',
        court_id: court_id || 3,
        date: effectiveDate,
        selectedSlots: effectiveSlots,
        status: 'success',
        name: userName,
      });
    } catch (error: any) {
      console.error('Не удалось создать бронирование:', error.message || error);
      Alert.alert('Ошибка', error.message || 'Не удалось создать бронирование');
      navigation.navigate('BookingSuccess', {
        court: court || 'Корт №3',
        court_id: court_id || 3,
        date: effectiveDate,
        selectedSlots: effectiveSlots || [time || '20:00-21:00'],
        status: 'error',
        name: userName,
      });
    }
  };

  return (
    <Screen noPaddingTop={true}>
      <View style={styles.container}>
        <BookingConfirmation
          court={court || 'Корт №3'}
          date={moment(effectiveDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}
          name={userName}
          time={time || '20:00-21:00'}
          price={`${price} ₽`}
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