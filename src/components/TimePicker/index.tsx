import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styled';

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

interface TimePickerProps {
  onSelectionChange?: (selectedSlots: string[]) => void;
  resetSelection?: () => void; // Новый проп для сброса выбора
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectionChange, resetSelection }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

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
        const isPast = hour < currentHour;
        slots.push({
          start,
          end,
          isBooked: isPast || Math.random() > 0.5,
        });
      }
      setTimeSlots(slots);
    };

    updateSlots();
    const timer = setInterval(updateSlots, 60000); // Обновляем слоты каждую минуту

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const slotHeight = 60; // Высота слота
      const timeTextHeight = 20; // Высота timeText (с учётом fontSize и отступов)
      const totalSlotHeight = slotHeight + timeTextHeight; // Общая высота одного блока (timeText + slot)
      const startHour = 8;

      let position: number;
      if (currentHour < startHour) {
        position = 0;
      } else if (currentHour >= 24) {
        position = (24 - startHour) * totalSlotHeight;
      } else {
        position = ((currentHour - startHour) + currentMinute / 60) * totalSlotHeight;
      }

      console.log('Позиция линии:', position); // Логируем позицию линии

      setCurrentTimePosition(position);
    };

    updatePosition();
    const timer = setInterval(updatePosition, 60000); // Обновляем позицию линии каждую минуту

    return () => clearInterval(timer);
  }, []);

  // Функция для сброса выбранных слотов
  const resetSelectedSlots = () => {
    setSelectedSlots([]);
  };

  // Вызываем resetSelection из пропсов, если он передан
  useEffect(() => {
    if (resetSelection) {
      resetSelection();
    }
  }, [selectedSlots, resetSelection]);

  const handleSlotPress = (slot: TimeSlot) => {
    if (slot.isBooked) return;

    const slotKey = `${slot.start}-${slot.end}`;
    const updatedSlots = selectedSlots.includes(slotKey)
      ? selectedSlots.filter((key) => key !== slotKey)
      : [...selectedSlots, slotKey];

    setSelectedSlots(updatedSlots);

    if (onSelectionChange) {
      onSelectionChange(updatedSlots);
    }
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
                  <TouchableOpacity
                    onPress={() => handleSlotPress(slot)}
                    disabled={slot.isBooked}
                  >
                    <View
                      style={[
                        styles.slot,
                        slot.isBooked ? styles.slotBooked : styles.slotAvailable,
                        isSelected && styles.slotSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          isSelected && styles.slotTextSelected,
                        ]}
                      >
                        {slot.start} → {slot.end}
                      </Text>
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