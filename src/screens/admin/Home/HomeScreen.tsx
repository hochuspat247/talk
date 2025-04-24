import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, Text, RefreshControl } from 'react-native';
import Header from '@components/Header';
import DatePicker from '@components/DatePicker';
import TimePicker from '@components/TimePicker';
import CourtSelector from '@components/CourtSelector';
import Screen from '@components/Screen';
import BottomNavigator from '@components/BottomNavigator';
import Button from '@components/UI/Button';
import { styles } from './styled';
import { BlurView } from 'expo-blur';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCourts } from '@api/courts';
import { getAvailability } from '@api/bookings';
import { getProfile } from '@api/profile';
import { BookingAvailability, User, Court } from '@api/types';
import moment from 'moment-timezone';
import debounce from 'lodash/debounce';

type RootStackParamList = {
  Home: undefined;
  SelectUser: {
    court: string;
    court_id: number;
    date: string;
    time: string;
    price: string;
    selectedSlots: string[];
  };
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    name: string;
    time: string;
    price: string;
    selectedSlots: string[];
    fromMyBookings?: boolean;
  };
  BookingSuccess: { court: string; court_id: number; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [courts, setCourts] = useState<string[]>([]);
  const [courtIds, setCourtIds] = useState<Map<string, number>>(new Map());
  const [bookedSlots, setBookedSlots] = useState<BookingAvailability[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ firstName: string; lastName: string } | null>(null);
  const availabilityCacheRef = useRef<Map<string, BookingAvailability[]>>(new Map());

  // Форматирование имени в формат "Имя Ф."
  const formatUserName = (fullName: string): string => {
    const [firstName, lastName] = fullName.split(' ');
    return lastName ? `${firstName} ${lastName.charAt(0)}.` : firstName;
  };

  // Загрузка профиля администратора
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const user: User = await getProfile(parseInt(userId));
          if (user.role !== 'admin') {
            throw new Error('User is not an admin');
          }
          setCurrentUser({ firstName: user.first_name, lastName: user.last_name });
        } else {
          throw new Error('User ID not found in AsyncStorage');
        }
      } catch (error: any) {
        console.error('Ошибка при загрузке профиля администратора:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные администратора');
        setCurrentUser({ firstName: 'Админ', lastName: 'Админов' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Загрузка списка кортов
  useEffect(() => {
    const fetchCourts = async () => {
      setIsLoading(true);
      try {
        const courtsData: Court[] = await getAllCourts();
        const courtNames = courtsData.map((court) => court.name);
        const courtIdMap = new Map<string, number>();
        courtsData.forEach((court) => courtIdMap.set(court.name, court.id));

        setCourts(courtNames);
        setCourtIds(courtIdMap);

        if (courtNames.length > 0) {
          const defaultCourt = courtNames[0];
          const defaultCourtId = courtIdMap.get(defaultCourt);
          setSelectedCourt(defaultCourt);
          setSelectedCourtId(defaultCourtId || null);
        }
      } catch (error: any) {
        console.error('Ошибка при загрузке кортов:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить список кортов');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourts();
  }, []);

  // Форматирование даты для API (YYYY-MM-DD)
  const formatDate = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD');
  };

  // Форматирование даты для отображения (DD.MM.YYYY)
  const formatDateForDisplay = (date: Date): string => {
    return moment(date).format('DD.MM.YYYY');
  };

  // Форматирование временного диапазона
  const formatTimeRange = (slots: string[]): string => {
    if (!slots.length) return '';
    const sortedSlots = [...slots].sort();
    const firstTime = sortedSlots[0].split('-')[0];
    const lastTime = sortedSlots[sortedSlots.length - 1].split('-')[1];
    return `${firstTime}-${lastTime}`;
  };

  // Расчет стоимости
  const calculatePrice = (slots: string[]): string => {
    const pricePerSlot = 1500;
    const totalPrice = slots.length * pricePerSlot;
    return `${totalPrice} ₽`;
  };

  // Получение данных о доступности
  const fetchAvailability = useCallback(
    debounce(async (forceRefresh: boolean = false) => {
      if (!selectedCourtId) return;
      const formattedDate = formatDate(selectedDate);
      const cacheKey = `${selectedCourtId}-${formattedDate}`;

      if (!forceRefresh && availabilityCacheRef.current.has(cacheKey)) {
        setBookedSlots(availabilityCacheRef.current.get(cacheKey)!);
        return;
      }

      try {
        const availability: BookingAvailability[] = await getAvailability(selectedCourtId, formattedDate);
        // Форматируем имена в формат "Имя Ф."
        const formattedAvailability = availability.map((slot) => ({
          ...slot,
          name: slot.name ? formatUserName(slot.name) : undefined,
        }));
        setBookedSlots(formattedAvailability);
        availabilityCacheRef.current.set(cacheKey, formattedAvailability);
      } catch (error: any) {
        console.error('Ошибка при загрузке доступности:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные о бронированиях');
      }
    }, 2000),
    [selectedCourtId, selectedDate]
  );

  // Обновление доступности при изменении корта или даты
  useEffect(() => {
    if (selectedCourtId !== null) {
      const cacheKey = `${selectedCourtId}-${formatDate(selectedDate)}`;
      availabilityCacheRef.current.delete(cacheKey);
      fetchAvailability(true);
    }
  }, [selectedCourtId, selectedDate, fetchAvailability]);

  // Автообновление данных каждые 2 минуты
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCourtId !== null) {
        console.log('Автообновление данных доступности...');
        fetchAvailability(true);
      }
    }, 120 * 1000);
    return () => clearInterval(interval);
  }, [selectedCourtId, fetchAvailability]);

  // Обработчик pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAvailability(true);
    } catch (error: any) {
      console.error('Ошибка при обновлении:', error);
      Alert.alert('Ошибка', 'Не удалось обновить данные');
    } finally {
      setRefreshing(false);
    }
  }, [fetchAvailability]);

  // Обработчик бронирования
  const handleBooking = async () => {
    if (!selectedCourtId) {
      Alert.alert('Ошибка', 'Выберите корт');
      return;
    }

    const formattedTime = formatTimeRange(selectedSlots);
    const formattedDate = formatDateForDisplay(selectedDate);
    const totalPrice = calculatePrice(selectedSlots);

    // Проверка доступности слотов перед бронированием
    const formattedDateForAPI = formatDate(selectedDate);
    try {
      const availability = await getAvailability(selectedCourtId, formattedDateForAPI);
      const isSlotAvailable = selectedSlots.every((slot) => {
        const [startTime, endTime] = slot.split('-');
        return availability.some((avail) => avail.start === startTime && avail.end === endTime && !avail.is_booked);
      });

      if (!isSlotAvailable) {
        Alert.alert('Ошибка', 'Один или несколько выбранных слотов уже заняты. Пожалуйста, выберите другие слоты.');
        await fetchAvailability(true);
        return;
      }
    } catch (error: any) {
      console.error('Ошибка при проверке доступности:', error);
      Alert.alert('Ошибка', 'Не удалось проверить доступность слотов');
      return;
    }

    navigation.navigate('SelectUser', {
      court: selectedCourt,
      court_id: selectedCourtId,
      date: formattedDate,
      time: formattedTime,
      price: totalPrice,
      selectedSlots,
    });

    setSelectedSlots([]);
    const cacheKey = `${selectedCourtId}-${formatDate(selectedDate)}`;
    availabilityCacheRef.current.delete(cacheKey);
    fetchAvailability(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <Header userName={currentUser ? currentUser.firstName : 'Админ'} />
        {isLoading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <>
            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={(date) => setSelectedDate(date)}
              daysToShow={30}
            />
            <CourtSelector
              selectedCourt={selectedCourt}
              onCourtSelect={(court) => {
                setSelectedCourt(court);
                setSelectedCourtId(courtIds.get(court) || null);
              }}
              courts={courts}
            />
            <ScrollView
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              <View style={styles.contentContainer}>
                <TimePicker
                  onSelectionChange={(slots) => setSelectedSlots(slots)}
                  bookedSlots={bookedSlots.map((slot) => ({
                    start: slot.start,
                    end: slot.end,
                    isBooked: slot.is_booked,
                    name: slot.name, // Уже в формате "Имя Ф."
                  }))}
                  date={formatDate(selectedDate)}
                />
              </View>
            </ScrollView>
            {selectedSlots.length > 0 && (
              <BlurView intensity={70} tint="light" style={styles.bookButtonWrapper}>
                <View style={{ width: '100%' }}>
                  <Button title="Забронировать" onPress={handleBooking} variant="primary" />
                </View>
              </BlurView>
            )}
          </>
        )}
      </Screen>
      <BottomNavigator activeTab="Home" />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;