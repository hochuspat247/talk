import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, Text, RefreshControl } from 'react-native';
import Header from '@components/Header';
import DatePicker from '@components/DatePicker';
import TimePicker from '@components/TimePicker';
import CourtSelector from '@components/CourtSelector';
import Screen from '@components/Screen';
import BottomNavigator from '@components/BottomNavigator';
import Button from '@components/Button';
import { styles } from './styled';
import { BlurView } from 'expo-blur';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCourts } from '@api/courts';
import { getAvailability } from '@api/bookings';
import { getProfile } from '@api/profile';
import { BookingAvailability, User } from '@api/types';
import moment from 'moment';
import debounce from 'lodash/debounce';

type RootStackParamList = {
  Home: undefined;
  Bookings: {
    court: string;
    court_id: number;
    date: string;
    name: string;
    time: string;
    price: number;
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
  const [availabilityCache, setAvailabilityCache] = useState<Map<string, BookingAvailability[]>>(new Map());

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const user: User = await getProfile(parseInt(userId));
          setCurrentUser({ firstName: user.first_name, lastName: user.last_name });
        } else {
          throw new Error('User ID not found in AsyncStorage');
        }
      } catch (error: any) {
        console.error('Ошибка при загрузке профиля пользователя:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные пользователя');
        setCurrentUser({ firstName: 'Дмитрий', lastName: 'Иванов' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCourts = async () => {
      setIsLoading(true);
      try {
        const courtsData = await getAllCourts();
        const courtNames = courtsData.map((court) => court.name);
        const courtIdMap = new Map<string, number>();
        courtsData.forEach((court) => courtIdMap.set(court.name, court.id));

        setCourts(courtNames);
        setCourtIds(courtIdMap);

        if (courtNames.length > 0) {
          const defaultCourt = courtNames[0];
          const defaultCourtId = courtIdMap.get(defaultCourt);
          setSelectedCourt(defaultCourt);
          if (typeof defaultCourtId === 'number') {
            setSelectedCourtId(defaultCourtId);
          } else {
            console.warn('❗ defaultCourtId не определен для:', defaultCourt);
          }
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

  const fetchAvailability = useCallback(
    debounce(async (forceRefresh: boolean = false) => {
      if (typeof selectedCourtId !== 'number') {
        console.warn('⛔️ selectedCourtId не является числом:', selectedCourtId);
        return;
      }
      if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
        console.warn('⛔️ selectedDate некорректна:', selectedDate);
        return;
      }
  
      const formattedDate = formatDate(selectedDate);
      const cacheKey = `${selectedCourtId}-${formattedDate}`;
  
      // Если не принудительное обновление и данные есть в кэше, используем кэш
      if (!forceRefresh && availabilityCache.has(cacheKey)) {
        setBookedSlots(availabilityCache.get(cacheKey)!);
        return;
      }
  
      try {
        console.log('📤 Вызов getAvailability:', { courtId: selectedCourtId, date: formattedDate });
        const availability = await getAvailability(selectedCourtId, formattedDate);
        setBookedSlots(availability);
        setAvailabilityCache((prev) => new Map(prev).set(cacheKey, availability));
      } catch (error) {
        console.error('❌ Ошибка fetchAvailability:', error);
      }
    }, 500),
    [selectedCourtId, selectedDate]
  );
  
  useEffect(() => {
    if (selectedCourtId !== null) {
      fetchAvailability();
    }
  }, [fetchAvailability, selectedCourtId]); // Добавляем selectedCourtId в зависимости
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCourtId !== null) {
        console.log('Автообновление данных доступности...');
        fetchAvailability(true); // Принудительное обновление каждые 60 секунд
      }
    }, 60 * 1000);
  
    return () => clearInterval(interval);
  }, [fetchAvailability, selectedCourtId]); // Добавляем selectedCourtId в зависимости

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Автообновление данных доступности...');
      fetchAvailability();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchAvailability]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAvailability();
    } catch (error: any) {
      console.error('Ошибка при обновлении доступности:', error);
      Alert.alert('Ошибка', 'Не удалось обновить данные');
    } finally {
      setRefreshing(false);
    }
  }, [fetchAvailability]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '.');
  };

  const formatUserName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName.charAt(0)}.`;
  };

  const formatTimeRange = (slots: string[]): string => {
    if (!slots || slots.length === 0) return '';

    const sortedSlots = [...slots].sort((a, b) => {
      const startA = a.split('-')[0];
      const startB = b.split('-')[0];
      return startA.localeCompare(startB);
    });

    const firstTime = sortedSlots[0].split('-')[0];
    const lastTime = sortedSlots[sortedSlots.length - 1].split('-')[1];

    return `${firstTime}-${lastTime}`;
  };

  const calculatePrice = (slots: string[]): { totalPrice: number; slotsCount: number } => {
    const pricePerSlot = 1500;
    const slotsCount = slots.length;
    const totalPrice = slotsCount * pricePerSlot;
    return { totalPrice, slotsCount };
  };

  const handleBooking = async () => {
    const formattedTime = formatTimeRange(selectedSlots);
    const formattedDateForDisplay = formatDateForDisplay(selectedDate);
    const formattedDateForAPI = formatDate(selectedDate);
    const { totalPrice, slotsCount } = calculatePrice(selectedSlots);
    const formattedName = currentUser
      ? formatUserName(currentUser.firstName, currentUser.lastName)
      : 'Дмитрий И.';
  
    // Проверяем доступность слотов перед бронированием
    const availability = await getAvailability(selectedCourtId || 3, formattedDateForAPI);
    const isSlotAvailable = selectedSlots.every((slot) => {
      const [startTime, endTime] = slot.split('-');
      const slotStartHour = parseInt(startTime.split(':')[0], 10);
      const slotEndHour = parseInt(endTime.split(':')[0], 10);
      return availability.some((avail) => {
        const availStartHour = parseInt(avail.start.split(':')[0], 10);
        const availEndHour = parseInt(avail.end.split(':')[0], 10);
        return (
          slotStartHour >= availStartHour &&
          slotEndHour <= availEndHour &&
          !avail.is_booked
        );
      });
    });
  
    if (!isSlotAvailable) {
      Alert.alert('Ошибка', 'Один или несколько выбранных слотов уже заняты. Пожалуйста, выберите другие слоты.');
      await fetchAvailability(); // Обновляем доступность
      return;
    }
  
    // Логируем selectedSlots перед отправкой
    console.log('Selected slots before booking:', selectedSlots);
  
    Alert.alert(
      'Подтверждение бронирования',
      `Вы бронируете корт "${selectedCourt}" на ${formattedDateForDisplay} с ${formattedTime}.\nКоличество слотов: ${slotsCount}\nИтоговая цена: ${totalPrice} ₽\n\nПодтвердить?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Подтвердить',
          onPress: async () => {
            navigation.navigate('Bookings', {
              court: selectedCourt,
              court_id: selectedCourtId || 3,
              date: formattedDateForAPI,
              name: formattedName,
              time: formattedTime,
              price: totalPrice,
              selectedSlots,
              fromMyBookings: false,
            });
            setSelectedSlots([]);
            // Очищаем кэш и обновляем доступность
            setAvailabilityCache((prev) => {
              const newCache = new Map(prev);
              newCache.delete(`${selectedCourtId}-${formattedDateForAPI}`);
              return newCache;
            });
            await fetchAvailability();
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen>
        <Header userName={currentUser ? currentUser.firstName : 'Дмитрий'} />

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
              courtId={selectedCourtId}
              selectedCourt={selectedCourt}
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
                  onSelectionChange={(slots: string[]) => setSelectedSlots(slots)}
                  bookedSlots={bookedSlots}
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