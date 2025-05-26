import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@styles/NewBookingScreen.styles';
import { mockTimeSlots } from '@mocks/mockData';

interface TimeSlotsProps {
  selectedSlot: string | null;
  setSelectedSlot: (slot: string | null) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ selectedSlot, setSelectedSlot }) => {
  const availableTimeSlots = useMemo(() => mockTimeSlots, []);

  const handleSlotPress = (slot: string) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  return (
    <View style={styles.timeSlotsContainer}>
      {availableTimeSlots.length > 0 ? (
        availableTimeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlotCard,
              slot === selectedSlot && styles.timeSlotCardSelected,
            ]}
            onPress={() => handleSlotPress(slot)}
          >
            <Text
              style={[
                styles.timeSlotText,
                slot === selectedSlot && styles.timeSlotTextSelected,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ color: '#999', textAlign: 'center', width: '100%' }}>
          Нет свободных слотов на эту дату
        </Text>
      )}
    </View>
  );
};

export default TimeSlots;