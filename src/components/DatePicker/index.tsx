import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styled';

interface DatePickerProps {
  selectedDate: number; // Выбранная дата (день месяца)
  onDateSelect: (day: number) => void; // Обработчик выбора даты
  daysToShow?: number; // Сколько дней показывать (по умолчанию 30)
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateSelect, daysToShow = 30 }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [dates, setDates] = React.useState<{ day: number; hasSlots: boolean; fullDate: Date }[]>([]);

  // Генерация дат
  useEffect(() => {
    const generatedDates = [];
    const startDate = new Date(); // Текущая дата с телефона

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      generatedDates.push({
        day: date.getDate(),
        hasSlots: Math.random() > 0.5, // Случайное наличие мест
        fullDate: date,
      });
    }

    setDates(generatedDates);
  }, [daysToShow]);

  // Функция для определения, является ли день выходным (суббота или воскресенье)
  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 - воскресенье, 6 - суббота
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((date) => {
        const isSelected = date.day === selectedDate;
        const isWeekendDay = isWeekend(date.fullDate);

        return (
          <TouchableOpacity
            key={date.day}
            style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
            onPress={() => onDateSelect(date.day)}
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
                date.hasSlots ? styles.dotAvailable : styles.dotUnavailable, // Зеленый или серый цвет точки
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DatePicker;