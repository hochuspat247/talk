import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { styles } from './styled';
import { AvailabilityCalendarProps } from './types';

interface DaysGridProps extends AvailabilityCalendarProps {
  calendarDays: moment.Moment[];
  currentMonth: moment.Moment;
}

const DaysGrid: React.FC<DaysGridProps> = ({
  calendarDays,
  currentMonth,
  availability,
  selectedDate,
  onDatePress,
}) => (
  <View style={styles.daysGrid}>
    {calendarDays.map((day) => {
      const iso = day.format('YYYY-MM-DD');
      const inMonth = day.isSame(currentMonth, 'month');
      const hasFree = availability[iso] === true;
      const hasBusy = availability[iso] === false;
      const isToday = day.isSame(moment(), 'day');
      const isSelected = selectedDate === iso;

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
);

export default DaysGrid;