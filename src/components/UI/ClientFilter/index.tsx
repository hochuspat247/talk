// ClientFilter.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/ru';

import Input from '@components/UI/Input';
import { ClientFilterProps, FilterState } from './types';
import { styles } from './styled';
import { DEFAULT_FILTERS, FILTER_LABELS, COLORS, NEW_BOOKING_LABELS } from './constants';
import { useNavigation, useRoute } from '@react-navigation/native'; // Добавляем useRoute
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';

interface ClientFilterPropsExtended extends ClientFilterProps {
  isNewBooking?: boolean;
}

type NavigationProp = NativeStackNavigationProp<ClientStackParamList, 'NewBooking'>;
type RouteProp = {
  params: {
    result?: { latitude: number; longitude: number; address: string };
  };
};

const ClientFilter: React.FC<ClientFilterPropsExtended> = ({
  onChange,
  initialValues,
  isNewBooking = false,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>(); // Получаем параметры текущего маршрута
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialValues,
  });

  const [repeatPeriod, setRepeatPeriod] = useState<string | null>(null);
  const [repeatDate, setRepeatDate] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [reminderPeriod, setReminderPeriod] = useState<string | null>(null);
  const [reminderDateRange, setReminderDateRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarMode, setCalendarMode] = useState<'repeat' | 'reminder' | null>(null);

  // Обработчик возврата с MapScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Получаем параметры текущего маршрута (NewBooking)
      const result = route.params?.result;
      console.log("Получен результат от MapScreen:", result);
      if (result && result.address) {
        setAddress(result.address);
        // Очищаем параметры маршрута, чтобы избежать повторного использования
        navigation.setParams({ result: undefined });
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  useEffect(() => {
    setFilters((prevFilters) => {
      const newFilters = { ...DEFAULT_FILTERS, ...initialValues };
      if (
        prevFilters.men !== newFilters.men ||
        prevFilters.women !== newFilters.women ||
        prevFilters.children !== newFilters.children
      ) {
        return newFilters;
      }
      return prevFilters;
    });
  }, [initialValues]);

  const handleToggle = (key: keyof FilterState) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: !prev[key] };
      onChange(newFilters);
      return newFilters;
    });
  };

  const handleRepeatPeriodSelect = (period: string) => {
    if (period === 'custom') {
      setCalendarMode('repeat');
      setShowCalendar(true);
    } else {
      setRepeatPeriod(period);
      setRepeatDate(null);
    }
  };

  const handleReminderPeriodSelect = (period: string) => {
    if (period === 'custom') {
      setCalendarMode('reminder');
      setShowCalendar(true);
    } else {
      setReminderPeriod(period);
      setReminderDateRange({ start: null, end: null });
    }
  };

  const handleDateSelect = (day: { dateString: string }) => {
    const selectedDate = day.dateString;
    if (calendarMode === 'repeat') {
      setRepeatDate(selectedDate);
      setRepeatPeriod('custom');
      setShowCalendar(false);
    } else if (calendarMode === 'reminder') {
      if (!reminderDateRange.start) {
        setReminderDateRange({ start: selectedDate, end: null });
      } else if (!reminderDateRange.end) {
        setReminderDateRange((prev) => ({ ...prev, end: selectedDate }));
        setReminderPeriod('custom');
        setShowCalendar(false);
      } else {
        setReminderDateRange({ start: selectedDate, end: null });
      }
    }
  };

  const openMapScreen = () => {
    navigation.navigate('MapScreen');
  };

  const formatRepeatDate = () => {
    if (!repeatDate) return '';
    return moment(repeatDate).format('DD.MM.YYYY');
  };

  const formatReminderDateRange = () => {
    if (!reminderDateRange.start || !reminderDateRange.end) return '';
    return `${moment(reminderDateRange.start).format('DD.MM.YYYY')} - ${moment(reminderDateRange.end).format(
      'DD.MM.YYYY'
    )}`;
  };

  const labels = isNewBooking ? NEW_BOOKING_LABELS : FILTER_LABELS;

  const markedDates = calendarMode === 'repeat' && repeatDate
    ? { [repeatDate]: { selected: true, color: COLORS.LABEL_ACTIVE, textColor: '#fff' } }
    : calendarMode === 'reminder' && reminderDateRange.start && reminderDateRange.end
    ? {
        [reminderDateRange.start]: { startingDay: true, color: COLORS.LABEL_ACTIVE, textColor: '#fff' },
        [reminderDateRange.end]: { endingDay: true, color: COLORS.LABEL_ACTIVE, textColor: '#fff' },
        ...Object.fromEntries(
          Array.from(
            { length: moment(reminderDateRange.end).diff(moment(reminderDateRange.start), 'days') - 1 },
            (_, index) => [
              moment(reminderDateRange.start).add(index + 1, 'days').format('YYYY-MM-DD'),
              { color: COLORS.LABEL_ACTIVE, textColor: '#fff' },
            ]
          )
        ),
      }
    : calendarMode === 'reminder' && reminderDateRange.start
    ? { [reminderDateRange.start]: { startingDay: true, color: COLORS.LABEL_ACTIVE, textColor: '#fff' } }
    : {};

  return (
    <View style={styles.container}>
      {!isNewBooking && <Text style={styles.header}>Мои клиенты</Text>}

      <View style={styles.switchContainer}>
        {(['men', 'women', 'children'] as const).map((key) => (
          <View key={key}>
            <View style={styles.switchRow}>
              <Text style={[styles.label, filters[key] && styles.labelActive]}>
                {labels[key]}
              </Text>
              <Switch
                trackColor={{ false: COLORS.TRACK_INACTIVE, true: COLORS.TRACK_ACTIVE }}
                thumbColor={filters[key] ? COLORS.THUMB_ACTIVE : COLORS.THUMB_INACTIVE}
                onValueChange={() => handleToggle(key)}
                value={filters[key]}
                accessibilityLabel={`Переключатель для ${labels[key]}`}
              />
            </View>

            {isNewBooking && filters[key] && (
              <View style={styles.additionalContainer}>
                {key === 'men' && (
                  <View style={styles.periodContainer}>
                    {['week', 'month', 'threeMonths'].map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={[
                          styles.periodButton,
                          repeatPeriod === period && styles.periodButtonActive,
                        ]}
                        onPress={() => handleRepeatPeriodSelect(period)}
                      >
                        <Text
                          style={[
                            styles.periodText,
                            repeatPeriod === period && styles.periodTextActive,
                          ]}
                        >
                          {period === 'week'
                            ? 'Неделя'
                            : period === 'month'
                            ? 'Месяц'
                            : '3 месяца'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={[
                        styles.periodButton,
                        repeatPeriod === 'custom' && styles.periodButtonActive,
                      ]}
                      onPress={() => handleRepeatPeriodSelect('custom')}
                    >
                      <Text
                        style={[
                          styles.periodText,
                          repeatPeriod === 'custom' && styles.periodTextActive,
                        ]}
                      >
                        Выбрать дату
                      </Text>
                    </TouchableOpacity>
                    {repeatDate && repeatPeriod === 'custom' && (
                      <TouchableOpacity
                        style={[styles.periodButton, styles.periodButtonActive]}
                        onPress={() => handleRepeatPeriodSelect('custom')}
                      >
                        <Text style={styles.periodTextActive}>{formatRepeatDate()}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {key === 'women' && (
                  <TouchableOpacity onPress={openMapScreen}>
                    <Input
                      value={address}
                      onChangeText={setAddress}
                      variant="map"
                      placeholder="Красная, Стаба, 147, 22"
                      style={styles.addressInput}
                      editable={false}
                    />
                  </TouchableOpacity>
                )}

                {key === 'children' && (
                  <View style={styles.periodContainer}>
                    {['oneHour', 'threeHours', 'oneDay', 'oneWeek'].map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={[
                          styles.periodButton,
                          reminderPeriod === period && styles.periodButtonActive,
                        ]}
                        onPress={() => handleReminderPeriodSelect(period)}
                      >
                        <Text
                          style={[
                            styles.periodText,
                            reminderPeriod === period && styles.periodTextActive,
                          ]}
                        >
                          {period === 'oneHour'
                            ? '1 час'
                            : period === 'threeHours'
                            ? '3 часа'
                            : period === 'oneDay'
                            ? '1 день'
                            : '1 неделя'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={[
                        styles.periodButton,
                        reminderPeriod === 'custom' && styles.periodButtonActive,
                      ]}
                      onPress={() => handleReminderPeriodSelect('custom')}
                    >
                      <Text
                        style={[
                          styles.periodText,
                          reminderPeriod === 'custom' && styles.periodTextActive,
                        ]}
                      >
                        Выбрать период
                      </Text>
                    </TouchableOpacity>
                    {reminderDateRange.start && reminderDateRange.end && reminderPeriod === 'custom' && (
                      <TouchableOpacity
                        style={[styles.periodButton, styles.periodButtonActive]}
                        onPress={() => handleReminderPeriodSelect('custom')}
                      >
                        <Text style={styles.periodTextActive}>{formatReminderDateRange()}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>

      <Modal visible={showCalendar} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
            <Calendar
              markingType={calendarMode === 'reminder' ? 'period' : 'dot'}
              markedDates={markedDates}
              onDayPress={handleDateSelect}
              theme={{
                selectedDayBackgroundColor: COLORS.LABEL_ACTIVE,
                todayTextColor: COLORS.LABEL_ACTIVE,
                arrowColor: COLORS.LABEL_ACTIVE,
              }}
            />
            <Text style={styles.dateRangeText}>
              {calendarMode === 'repeat' && repeatDate
                ? `Выбрано: ${formatRepeatDate()}`
                : calendarMode === 'reminder' && reminderDateRange.start && !reminderDateRange.end
                ? `Выбрано: ${moment(reminderDateRange.start).format('DD.MM.YYYY')}`
                : calendarMode === 'reminder'
                ? formatReminderDateRange() || 'Выберите диапазон дат'
                : 'Выберите дату'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClientFilter;