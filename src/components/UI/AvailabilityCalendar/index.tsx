// AvailabilityCalendar.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export interface AvailabilityCalendarProps {
  availability: Record<string, boolean>;
  selectedDate?: string;                // ISO-date of currently selected day
  onDatePress?: (date: string) => void;
}

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const SCREEN_WIDTH = Dimensions.get('window').width;
const DAY_CELL_SIZE = SCREEN_WIDTH / 7;

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  availability,
  selectedDate,
  onDatePress,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState<moment.Moment>(
    moment().startOf('month')
  );

  const calendarDays = React.useMemo(() => {
    const start = currentMonth.clone().startOf('month').startOf('week').add(1, 'day');
    const end = currentMonth.clone().endOf('month').endOf('week').add(1, 'day');
    const days: moment.Moment[] = [];
    const cursor = start.clone();
    while (cursor.isSameOrBefore(end, 'day')) {
      days.push(cursor.clone());
      cursor.add(1, 'day');
    }
    return days;
  }, [currentMonth]);

  const prevMonth = () => setCurrentMonth(m => m.clone().subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth(m => m.clone().add(1, 'month'));

  return (
    <View style={styles.container}>
      {/* Header with month navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{currentMonth.format('MMMM')}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday labels */}
      <View style={styles.weekDays}>
        {WEEK_DAYS.map(d => (
          <Text key={d} style={styles.weekDayText}>{d}</Text>
        ))}
      </View>

      {/* Day grid */}
      <View style={styles.daysGrid}>
        {calendarDays.map(day => {
          const iso = day.format('YYYY-MM-DD');
          const inMonth = day.isSame(currentMonth, 'month');
          const hasFree = availability[iso] === true;
          const hasBusy = availability[iso] === false;
          const isToday = day.isSame(moment(), 'day');
          const isSelected = selectedDate === iso;

          // Determine which background to show:
          // selected > today > none
          const showSelectedBg = inMonth && isSelected;
          const showTodayBg = inMonth && !isSelected && isToday;

          return (
            <TouchableOpacity
              key={iso}
              style={styles.dayCell}
              activeOpacity={onDatePress ? 0.7 : 1}
              onPress={() => onDatePress?.(iso)}
            >
              {showSelectedBg && <View style={styles.selectedBackground} />}
              {showTodayBg && <View style={styles.todayBackground} />}

              <Text
                style={[
                  styles.dayText,
                  !inMonth && styles.dayTextDisabled,
                  isSelected && styles.dayTextSelected,
                  !isSelected && showTodayBg && styles.dayTextToday,
                ]}
              >
                {day.date()}
              </Text>

              {inMonth && hasFree && <View style={styles.dotFree} />}
              {inMonth && hasBusy && <View style={styles.dotBusy} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AvailabilityCalendar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  navArrow: {
    fontSize: 24,
    color: '#333',
    width: 32,
    textAlign: 'center',
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginHorizontal: 12,
    color: '#000',
  },
  weekDays: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 8,
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: DAY_CELL_SIZE,
    height: DAY_CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayBackground: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF20',
  },
  selectedBackground: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    color: '#000',
  },
  dayTextDisabled: {
    color: '#CCC',
  },
  dayTextToday: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  dotFree: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1CB37C',
  },
  dotBusy: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CCC',
  },
});
