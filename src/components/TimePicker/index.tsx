import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styled';
import moment from 'moment';

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
  name?: string;
}

interface TimePickerProps {
  onSelectionChange?: (selectedSlots: string[]) => void;
  bookedSlots?: TimeSlot[];
  date?: string; // формат YYYY-MM-DD
}

const TimePicker: React.FC<TimePickerProps> = ({ onSelectionChange, bookedSlots = [], date }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const isToday = moment(date, 'YYYY-MM-DD').isSame(moment(), 'day');

  useEffect(() => {
    const updateSlots = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const slots: TimeSlot[] = [];

      for (let hour = 8; hour < 23; hour++) {
        const start = `${String(hour).padStart(2, '0')}:00`;
        const end = `${String(hour + 1).padStart(2, '0')}:00`;
        const isPast = isToday && hour < currentHour;

        const bookedSlot = bookedSlots.find((bs) => bs.start === start && bs.end === end);
        const isBooked = isPast || (bookedSlot?.isBooked || bookedSlot?.is_booked);

        slots.push({
          start,
          end,
          isBooked,
          name: bookedSlot?.name,
        });
      }

      setTimeSlots(slots);

      const updatedSelectedSlots = selectedSlots.filter((slot) => {
        const [start, end] = slot.split('-');
        const hour = parseInt(start.split(':')[0]);
        const bookedSlot = bookedSlots.find((bs) => bs.start === start && bs.end === end);
        return (!isToday || hour >= currentHour) && (!bookedSlot || !bookedSlot.isBooked && !bookedSlot.is_booked);
      });

      if (JSON.stringify(updatedSelectedSlots) !== JSON.stringify(selectedSlots)) {
        setSelectedSlots(updatedSelectedSlots);
        onSelectionChange?.(updatedSelectedSlots);
      }
    };

    updateSlots();
    const timer = setInterval(updateSlots, 60000);
    return () => clearInterval(timer);
  }, [bookedSlots, isToday, selectedSlots, onSelectionChange]);

  useEffect(() => {
    if (!isToday) {
      setCurrentTimePosition(0);
      return;
    }

    const updatePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const slotHeight = 60;
      const timeTextHeight = 20;
      const totalSlotHeight = slotHeight + timeTextHeight;
      const startHour = 8;

      const position =
        currentHour < startHour
          ? 0
          : currentHour >= 24
          ? (24 - startHour) * totalSlotHeight
          : ((currentHour - startHour) + currentMinute / 60) * totalSlotHeight;

      setCurrentTimePosition(position);
    };

    updatePosition();
    const timer = setInterval(updatePosition, 60000);
    return () => clearInterval(timer);
  }, [isToday]);

  const handleSlotPress = (slot: TimeSlot) => {
    if (slot.isBooked) return;

    const slotKey = `${slot.start}-${slot.end}`;
    const updatedSlots = selectedSlots.includes(slotKey)
      ? selectedSlots.filter((key) => key !== slotKey)
      : [...selectedSlots, slotKey];

    setSelectedSlots(updatedSlots);
    onSelectionChange?.(updatedSlots);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.slotsContainer}>
          {timeSlots.map((slot, index) => {
            const slotKey = `${slot.start}-${slot.end}`;
            const isSelected = selectedSlots.includes(slotKey);

            const appliedStyle = [
              styles.slot,
              slot.isBooked ? styles.slotBooked : styles.slotAvailable,
              isSelected && styles.slotSelected,
            ];

            return (
              <React.Fragment key={index}>
                <Text style={styles.timeText}>{slot.start}</Text>
                <View style={styles.slotWrapper}>
                  <TouchableOpacity onPress={() => handleSlotPress(slot)} disabled={slot.isBooked}>
                    <View style={appliedStyle}>
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
          <Text style={styles.timeText}>23:00</Text>

          {isToday && (
            <View style={[styles.currentTimeLine, { top: currentTimePosition }]}>
              <View style={styles.currentTimeDot} />
              <View style={styles.currentTimeLineBar} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TimePicker;
