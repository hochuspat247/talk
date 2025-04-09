import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styled';

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
  name?: string; // Имя того, кто забронировал
}

interface TimePickerProps {
  onSelectionChange?: (selectedSlots: string[]) => void;
  bookedSlots?: TimeSlot[]; // Забронированные слоты с именами
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectionChange, bookedSlots = [] }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Генерация слотов и синхронизация с bookedSlots
  useEffect(() => {
    const updateSlots = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      console.log('Текущее время:', now.toISOString(), 'Час:', currentHour, 'Минуты:', currentMinute);

      const slots: TimeSlot[] = [];
      for (let hour = 8; hour < 24; hour++) {
        const start = `${hour}:00`;
        const end = `${hour + 1}:00`;
        const slotKey = `${start}-${end}`;
        const isPast = hour < currentHour;
        const bookedSlot = bookedSlots.find((bs) => bs.start === start && bs.end === end);

        slots.push({
          start,
          end,
          isBooked: isPast || (bookedSlot ? bookedSlot.isBooked : false),
          name: bookedSlot?.name,
        });
      }
      setTimeSlots(slots);

      // Фильтруем selectedSlots, но не вызываем onSelectionChange
      const updatedSelectedSlots = selectedSlots.filter((slot) => {
        const [start] = slot.split('-');
        const hour = parseInt(start.split(':')[0]);
        const isStillAvailable = hour >= currentHour && !bookedSlots.some((bs) => `${bs.start}-${bs.end}` === slot);
        return isStillAvailable;
      });
      setSelectedSlots(updatedSelectedSlots);
    };

    updateSlots();
    const timer = setInterval(updateSlots, 60000); // Обновляем каждую минуту

    return () => clearInterval(timer);
  }, [bookedSlots]); // Убрали onSelectionChange из зависимостей

  // Обновление позиции текущего времени
  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const slotHeight = 60; // Высота слота
      const timeTextHeight = 20; // Высота timeText
      const totalSlotHeight = slotHeight + timeTextHeight; // Общая высота одного блока
      const startHour = 8;

      let position: number;
      if (currentHour < startHour) {
        position = 0;
      } else if (currentHour >= 24) {
        position = (24 - startHour) * totalSlotHeight;
      } else {
        position = ((currentHour - startHour) + currentMinute / 60) * totalSlotHeight;
      }

      console.log('Позиция линии:', position);
      setCurrentTimePosition(position);
    };

    updatePosition();
    const timer = setInterval(updatePosition, 60000); // Обновляем позицию линии каждую минуту

    return () => clearInterval(timer);
  }, []);

  const handleSlotPress = (slot: TimeSlot) => {
    if (slot.isBooked) return;

    const slotKey = `${slot.start}-${slot.end}`;
    const updatedSlots = selectedSlots.includes(slotKey)
      ? selectedSlots.filter((key) => key !== slotKey)
      : [...selectedSlots, slotKey];

    setSelectedSlots(updatedSlots);
    if (onSelectionChange) onSelectionChange(updatedSlots); // Вызываем только при выборе пользователем
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.slotsContainer}>
          {timeSlots.map((slot, index) => {
            const slotKey = `${slot.start}-${slot.end}`;
            const isSelected = selectedSlots.includes(slotKey);

            return (
              <React.Fragment key={index}>
                <Text style={styles.timeText}>{slot.start}</Text>
                <View style={styles.slotWrapper}>
                  <TouchableOpacity onPress={() => handleSlotPress(slot)} disabled={slot.isBooked}>
                    <View
                      style={[
                        styles.slot,
                        slot.isBooked ? styles.slotBooked : styles.slotAvailable,
                        isSelected && styles.slotSelected,
                      ]}
                    >
                      <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
                        {slot.start} → {slot.end}
                      </Text>
                      {slot.isBooked && slot.name && (
                        <Text style={styles.bookedName}>{slot.name}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            );
          })}
          <Text style={styles.timeText}>24:00</Text>

          <View style={[styles.currentTimeLine, { top: currentTimePosition }]}>
            <View style={styles.currentTimeDot} />
            <View style={styles.currentTimeLineBar} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TimePicker;