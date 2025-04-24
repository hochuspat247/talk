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
import { BookingAvailability, User } from '@api/types';
import moment from 'moment-timezone'; // Используем moment-timezone!
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
    timesISO?: string[];
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const user: User = await getProfile(parseInt(userId));
          setCurrentUser({ firstName: user.first_name, lastName: user.last_name });
        } else {
          throw new Error('User ID not found');
        }
      } catch (error) {
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
          }
        }
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось загрузить список кортов');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourts();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchAvailability = useCallback(
    debounce(async (forceRefresh: boolean = false) => {
      if (typeof selectedCourtId !== 'number' || !selectedDate || isNaN(new Date(selectedDate).getTime())) {
        return;
      }

      const formattedDate = formatDate(selectedDate);
      const cacheKey = `${selectedCourtId}-${formattedDate}`;

      if (!forceRefresh && availabilityCacheRef.current.has(cacheKey)) {
        setBookedSlots(availabilityCacheRef.current.get(cacheKey)!);
        return;
      }

      try {
        const availability = await getAvailability(selectedCourtId, formattedDate);
        setBookedSlots(availability);
        availabilityCacheRef.current.set(cacheKey, availability);
      } catch (error) {
        // Логирование только критических ошибок
      }
    }, 2000),
    [selectedCourtId, selectedDate]
  );

  useEffect(() => {
    if (selectedCourtId !== null) {
      const cacheKey = `${selectedCourtId}-${formatDate(selectedDate)}`;
      availabilityCacheRef.current.delete(cacheKey);
      fetchAvailability(true);
    }
  }, [selectedCourtId, selectedDate, fetchAvailability]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCourtId !== null) {
        fetchAvailability(true);
      }
    }, 120 * 1000);
    return () => clearInterval(interval);
  }, [selectedCourtId, fetchAvailability]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAvailability(true);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить данные');
    } finally {
      setRefreshing(false);
    }
  }, [fetchAvailability]);

  const formatDateForDisplay = (date: Date): string => {
    return date
      .toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.');
  };

  const formatUserName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName.charAt(0)}.`;
  };

  const formatTimeRange = (slots: string[]): string => {
    if (!slots || slots.length === 0) return '';
    const sortedSlots = [...slots].sort((a, b) => a.split('-')[0].localeCompare(b.split('-')[0]));
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

  const slotToISO = (baseDate: Date, slot: string): string => {
    const [startTime] = slot.split('-');
    const [hourStr, minuteStr] = startTime.split(':');
    const hour = parseInt(hourStr, 10) || 0;
    const minute = parseInt(minuteStr, 10) || 0;
    return moment.tz(baseDate, "Europe/Moscow")
      .set({ hour, minute, second: 0, millisecond: 0 })
      .format();
  };

  const handleBooking = async () => {
    const formattedTime = formatTimeRange(selectedSlots);
    const formattedDateForDisplay = formatDateForDisplay(selectedDate);
    const formattedDateForAPI = formatDate(selectedDate);
    const { totalPrice, slotsCount } = calculatePrice(selectedSlots);
    const formattedName = currentUser
      ? formatUserName(currentUser.firstName, currentUser.lastName)
      : 'Дмитрий И.';

    const cacheKey = `${selectedCourtId}-${formattedDateForAPI}`;
    availabilityCacheRef.current.delete(cacheKey);

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
      Alert.alert(
        'Ошибка',
        'Один или несколько выбранных слотов уже заняты. Пожалуйста, выберите другие слоты.'
      );
      await fetchAvailability();
      return;
    }

    const timesISO = selectedSlots.map((slot) => slotToISO(selectedDate, slot));

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
              timesISO,
            });
            setSelectedSlots([]);
            availabilityCacheRef.current.delete(cacheKey);
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