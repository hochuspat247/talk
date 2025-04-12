import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styled';
import { getAvailability } from '@api/bookings';

interface DatePickerProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  daysToShow?: number;
  courtId: number | null;
  selectedCourt: string;
}

const ALL_COURT_IDS = [1, 2, 3, 4];

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
  daysToShow = 30,
  courtId,
  selectedCourt,
}) => {
  const [dates, setDates] = useState<{ day: number; hasSlots: boolean; fullDate: Date }[]>([]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchAvailabilityForDates = async () => {
      const generatedDates = [];
      const startDate = new Date();

      for (let i = 0; i < daysToShow; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const formattedDate = formatDate(date);

        let hasAvailableSlot = false;

        try {
          const results = await Promise.all(
            ALL_COURT_IDS.map((courtId) => getAvailability(courtId, formattedDate))
          );

          for (const availability of results) {
            const freeSlots = availability.filter(
              (slot) => slot && (slot.is_booked === false || slot.isBooked === false)
            );
            if (freeSlots.length > 0) {
              hasAvailableSlot = true;
              break;
            }
          }
        } catch (error) {
          console.error('Error fetching availability for date:', formattedDate, error);
        }

        generatedDates.push({
          day: date.getDate(),
          hasSlots: hasAvailableSlot,
          fullDate: date,
        });
      }

      setDates(generatedDates);
    };

    fetchAvailabilityForDates();

    intervalId = setInterval(fetchAvailabilityForDates, 60000);

    return () => clearInterval(intervalId);
  }, [daysToShow, selectedCourt]);

  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((date) => {
        const isSelected =
          selectedDate instanceof Date &&
          date.fullDate.toDateString() === selectedDate.toDateString();

        const isWeekendDay = isWeekend(date.fullDate);

        return (
          <TouchableOpacity
            key={date.fullDate.toISOString()}
            style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
            onPress={() => onDateSelect(date.fullDate)}
          >
            <Text
              style={[styles.dateText, isWeekendDay && styles.weekendText]}
            >
              {date.day}
            </Text>
            <View
              style={[
                styles.dot,
                date.hasSlots ? styles.dotAvailable : styles.dotUnavailable,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DatePicker;