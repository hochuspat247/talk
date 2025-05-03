import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import BookingConfirmation from '@components/BookingConfirmation';
import Button from '@components/UI/Button';
import Screen from '@components/Layout/Screen';
import { StackScreenProps } from '@react-navigation/stack';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { createBooking, deleteBooking, getBooking } from '@api/bookings';
import moment from 'moment-timezone';
import { Booking } from '@api/types';

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
    user_name: string;
  };
  MyBookings: { filters?: FilterData };
  FilterScreen: { filters?: FilterData };
  Profile: undefined;
  SelectUser: { court: string; court_id: number; date: string; time: string; price: string; selectedSlots: string[] };
  ProfileOptions: undefined;
  Register: undefined;
  Home: undefined;
};

type FilterData = {
  dateFrom?: string;
  dateTo?: string;
  court: string;
  userIds: number[];
};

type BookingsScreenProps = StackScreenProps<RootStackParamList, 'Bookings'>;

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation, route }) => {
  const { court, court_id, date, name, time, price: rawPrice, status, fromMyBookings, selectedSlots, bookingId, user_id } = route.params || {};
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Логируем входные параметры
  console.log('Входные параметры:', route.params);

  // Нормализуем и валидируем дату
  const effectiveDate = React.useMemo(() => {
    const defaultDate = moment().format('YYYY-MM-DD');
    if (!date) {
      console.log('Дата не определена, используется по умолчанию:', defaultDate);
      return defaultDate;
    }

    // Проверяем формат YYYY-MM-DD
    let parsedDate = moment(date, 'YYYY-MM-DD', true);
    if (parsedDate.isValid()) {
      return date;
    }

    // Проверяем формат DD.MM.YYYY
    parsedDate = moment(date, 'DD.MM.YYYY', true);
    if (parsedDate.isValid()) {
      const formattedDate = parsedDate.format('YYYY-MM-DD');
      console.log(`Дата преобразована из DD.MM.YYYY в YYYY-MM-DD: ${date} -> ${formattedDate}`);
      return formattedDate;
    }

    console.log(`Неверный формат даты: ${date}, используется по умолчанию: ${defaultDate}`);
    return defaultDate;
  }, [date]);

  // Нормализуем и валидируем цену
  const price = React.useMemo(() => {
    if (typeof rawPrice === 'number') return rawPrice;
    const cleanedPrice = typeof rawPrice === 'string' ? rawPrice.replace(/[^0-9]/g, '') : '1500';
    const parsedPrice = Number(cleanedPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      console.log(`Неверная цена: ${rawPrice}, используется по умолчанию: 1500`);
      return 1500;
    }
    return parsedPrice;
  }, [rawPrice]);

  // Загрузка данных о бронировании при fromMyBookings
  useEffect(() => {
    const fetchBooking = async () => {
      if (fromMyBookings) {
        if (!bookingId) {
          console.error('bookingId не указан при fromMyBookings');
          Alert.alert('Ошибка', 'Идентификатор бронирования не указан');
          navigation.goBack();
          return;
        }

        setLoading(true);
        try {
          const booking = await getBooking(bookingId);
          console.log('Загружено бронирование:', booking);
          setBookingData(booking);
        } catch (error: any) {
          console.error('Ошибка при загрузке бронирования:', error);
          Alert.alert('Ошибка', error.message || 'Не удалось загрузить данные бронирования');
        } finally {
          setLoading(false);
        }
      }
    };
    console.log('Параметры загрузки: fromMyBookings=', fromMyBookings, 'bookingId=', bookingId);
    fetchBooking();
  }, [fromMyBookings, bookingId, navigation]);

  const handleDownload = async () => {
    try {
      const data = bookingData && fromMyBookings
        ? {
            court: bookingData.court || court || 'Корт №3',
            date: moment(bookingData.start_time).format('YYYY-MM-DD'),
            time: `${moment(bookingData.start_time).format('HH:mm')}-${moment(bookingData.end_time).format('HH:mm')}`,
            status: bookingData.status,
            price: bookingData.price,
            name: (bookingData.user_name || 'Неизвестный').replace(/[^a-zA-ZА-Яа-я\s.]/g, ''),
          }
        : {
            court: court || 'Корт №3',
            date: effectiveDate,
            time: time || '17:00-18:00',
            status: status || 'active',
            price: price,
            name: (name || 'Неизвестный').replace(/[^a-zA-ZА-Яа-я\s.]/g, ''),
          };

      console.log('Данные для PDF:', data);

      const htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Бронирование корта</h1>
            <p><strong>Корт:</strong> ${data.court}</p>
            <p><strong>Дата:</strong> ${moment(data.date, 'YYYY-MM-DD').format('DD.MM.YYYY')}</p>
            <p><strong>Время:</strong> ${data.time}</p>
            <p><strong>Статус:</strong> ${data.status === 'active' ? 'Активно' : 'Отменено'}</p>
            <p><strong>Имя:</strong> ${data.name}</p>
            <p><strong>Цена:</strong> ${data.price} ₽</p>
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

  const handleDelete = async () => {
    if (!bookingId) {
      Alert.alert('Ошибка', 'Идентификатор бронирования не найден');
      return;
    }

    Alert.alert(
      'Удалить бронирование',
      'Вы уверены, что хотите удалить это бронирование?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBooking(bookingId);
              navigation.goBack();
            } catch (error: any) {
              console.error('Ошибка при удалении бронирования:', error);
              Alert.alert('Ошибка', error.message || 'Не удалось удалить бронирование');
            }
          },
        },
      ]
    );
  };

  const handleConfirm = async () => {
    if (!user_id) {
      Alert.alert('Ошибка', 'Идентификатор пользователя не указан');
      return;
    }

    try {
      const effectiveSlots = selectedSlots || [time || '17:00-18:00'];
      const bookingIds: number[] = [];

      // Валидация временных слотов
      for (const slot of effectiveSlots) {
        const [startTime, endTime] = slot.split('-');
        if (!startTime || !endTime || !moment(`${effectiveDate} ${startTime}`, 'YYYY-MM-DD HH:mm').isValid()) {
          throw new Error(`Неверный формат времени: ${slot}. Ожидается HH:MM-HH:MM`);
        }

        // Проверка, что время в будущем
        const now = moment().tz('Europe/Moscow');
        const startDateTimeMoment = moment(`${effectiveDate} ${startTime}`, 'YYYY-MM-DD HH:mm');
        if (startDateTimeMoment.isBefore(now)) {
          throw new Error('Время бронирования должно быть в будущем');
        }

        // Формируем время в формате YYYY-MM-DD HH:mm:ss без tzinfo (совместимо с force_msk)
        const startDateTime = startDateTimeMoment.format('YYYY-MM-DD HH:mm:ss');
        const endDateTime = moment(`${effectiveDate} ${endTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');

        console.log('Отправка бронирования:', {
          court_id: court_id || 3,
          start_time: startDateTime,
          end_time: endDateTime,
          price: price,
          user_id: user_id,
        });

        const response = await createBooking({
          court_id: court_id || 3,
          start_time: startDateTime,
          end_time: endDateTime,
          price: price,
          user_id: user_id,
        });

        bookingIds.push(response.id);
      }

      navigation.navigate('BookingSuccess', {
        court: court || 'Корт №3',
        court_id: court_id || 3,
        date: effectiveDate,
        selectedSlots: effectiveSlots,
        status: 'success',
        bookingIds: bookingIds,
        user_name: name || 'Неизвестный',
      });
    } catch (error: any) {
      console.error('Не удалось создать бронирование:', error);
      Alert.alert('Ошибка', error.message || 'Не удалось создать бронирование');
      navigation.navigate('BookingSuccess', {
        court: court || 'Корт №3',
        court_id: court_id || 3,
        date: effectiveDate,
        selectedSlots: selectedSlots || [time || '17:00-18:00'],
        status: 'error',
        bookingIds: [],
        user_name: name || 'Неизвестный',
      });
    }
  };

  return (
    <Screen noPaddingTop={true}>
      <View style={styles.container}>
        {loading && fromMyBookings ? (
          <Text style={styles.loadingText}>Загрузка...</Text>
        ) : (
          <>
            <BookingConfirmation
              court={bookingData && fromMyBookings ? bookingData.court || court || 'Корт №3' : court || 'Корт №3'}
              date={moment(bookingData && fromMyBookings ? bookingData.start_time : effectiveDate).format('DD.MM.YYYY')}
              name={bookingData && fromMyBookings ? (bookingData.user_name || 'Неизвестный').replace(/[^a-zA-ZА-Яа-я\s.]/g, '') : (name || 'Неизвестный').replace(/[^a-zA-ZА-Яа-я\s.]/g, '')}
              time={
                bookingData && fromMyBookings
                  ? `${moment(bookingData.start_time).format('HH:mm')}-${moment(bookingData.end_time).format('HH:mm')}`
                  : time || '17:00-18:00'
              }
              price={`${bookingData && fromMyBookings ? bookingData.price : price} ₽`}
            />

            <View style={styles.buttonContainer}>
              {fromMyBookings ? (
                <View style={styles.buttonRow}>
                  <Button
                    title="Удалить"
                    onPress={handleDelete}
                    variant="error"
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
          </>
        )}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    width: '48%',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookingsScreen;