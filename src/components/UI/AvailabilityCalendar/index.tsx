import React from 'react';
import { View } from 'react-native';
import { useCalendar } from './hooks';
import { styles } from './styled';
import { getCalendarDays } from './utils';
import { AvailabilityCalendarProps } from './types';
import Header from './Header';
import WeekDays from './WeekDays';
import DaysGrid from './DaysGrid';

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  availability,
  selectedDate,
  onDatePress,
}) => {
  const { currentMonth, prevMonth, nextMonth } = useCalendar();
  const calendarDays = getCalendarDays(currentMonth);

  return (
    <View style={styles.container}>
      <Header currentMonth={currentMonth} onPrev={prevMonth} onNext={nextMonth} />
      <WeekDays />
      <DaysGrid
        calendarDays={calendarDays}
        currentMonth={currentMonth}
        availability={availability}
        selectedDate={selectedDate}
        onDatePress={onDatePress}
      />
    </View>
  );
};

export default AvailabilityCalendar;