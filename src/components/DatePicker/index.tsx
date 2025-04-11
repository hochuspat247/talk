import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styled';
import { getAvailability } from '@api/bookings';

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void; // ← вот это поправь
  daysToShow?: number;
  courtId: number | null;
  selectedCourt: string;
}


const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateSelect, daysToShow = 30, courtId, selectedCourt }) => {
  const [dates, setDates] = useState<{ day: number; hasSlots: boolean; fullDate: Date }[]>([]);

  // Форматирование даты в "гггг-мм-дд"
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
  };

  // Генерация дат и проверка доступности слотов
  useEffect(() => {
    const fetchAvailabilityForDates = async () => {
      const generatedDates = [];
      const startDate = new Date();

      if (!courtId) {
        // Если courtId отсутствует, создаём даты без проверки доступности
        for (let i = 0; i < daysToShow; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          generatedDates.push({
            day: date.getDate(),
            hasSlots: false,
            fullDate: date,
          });
        }
        setDates(generatedDates);
        return;
      }

      const promises = [];
      for (let i = 0; i < daysToShow; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const formattedDate = formatDate(date);
        promises.push(getAvailability(courtId, formattedDate));
        generatedDates.push({ day: date.getDate(), hasSlots: false, fullDate: date });
      }

      try {
        const availabilityResults = await Promise.all(promises);
        availabilityResults.forEach((availability, index) => {
          generatedDates[index].hasSlots = availability.some((slot) => !slot.is_booked);
        });
      } catch (error) {
        console.error('Error fetching availability for dates:', error);
      }

      setDates(generatedDates);
    };

    fetchAvailabilityForDates();
  }, [courtId, daysToShow, selectedCourt]);

  // Функция для определения, является ли день выходным (суббота или воскресенье)
  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 - воскресенье, 6 - суббота
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((date) => {
        const isSelected = date.fullDate.toDateString() === selectedDate.toDateString();
        const isWeekendDay = isWeekend(date.fullDate);

        return (
          <TouchableOpacity
            key={date.day}
            style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
            onPress={() => onDateSelect(date.fullDate)}

          >
            <Text
              style={[
                styles.dateText,
                isWeekendDay && styles.weekendText, // Красный цвет для выходных
              ]}
            >
              {date.day}
            </Text>
            <View
              style={[
                styles.dot,
                date.hasSlots ? styles.dotAvailable : styles.dotUnavailable, // Зелёный или серый цвет точки
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DatePicker;