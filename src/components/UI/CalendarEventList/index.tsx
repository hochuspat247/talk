import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import CalendarEventCard from '@components/UI/CalendarEventCard';

interface CalendarEventListProps {
  events: Array<{
    salonName: string;
    service: string;
    masterName: string;
    rating: number;
    time: string;
    duration: string;
    avatarUri?: string;
    status: 'confirmed' | 'active';
  }>;
  onMorePress?: () => void;
  isMini?: boolean;
}

const CalendarEventList: React.FC<CalendarEventListProps> = ({ events, onMorePress, isMini = true }) => {
  const maxVisibleEvents = 2;
  const visibleEvents = events.slice(0, maxVisibleEvents);
  const hiddenEventsCount = events.length > maxVisibleEvents ? events.length - maxVisibleEvents : 0;

  // Функция для преобразования длительности в минуты
  const parseDurationToMinutes = (duration: string): number => {
    const parts = duration.match(/^(?:(\d+)ч)?\s*(?:(\d+)мин)?$/);
    if (!parts) return 0;

    const hours = parseInt(parts[1] || '0', 10);
    const minutes = parseInt(parts[2] || '0', 10);
    return hours * 60 + minutes;
  };

  // Функция для форматирования длительности в "Xч Yмин"
  const formatTotalDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes}мин`;
    if (minutes === 0) return `${hours}ч`;
    return `${hours}ч ${minutes}мин`;
  };

  // Вычисляем суммарную длительность всех событий
  const totalDurationMinutes = events.reduce((total, event) => {
    return total + parseDurationToMinutes(event.duration);
  }, 0);

  // Форматируем суммарную длительность
  const totalDuration = formatTotalDuration(totalDurationMinutes);

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {visibleEvents.map((event, index) => (
          <View key={`${event.time}-${event.service}-${index}`} style={styles.cardWrapper}>
            <CalendarEventCard
              salonName={event.salonName}
              service={event.service}
              masterName={event.masterName}
              rating={event.rating}
              time={event.time}
              duration={isMini ? totalDuration : event.duration}
              avatarUri={event.avatarUri}
              status={event.status}
              isMini={isMini}
            />
          </View>
        ))}
      </View>
      {hiddenEventsCount > 0 && onMorePress && (
        <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
          <Text style={styles.moreButtonText}>+{hiddenEventsCount}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: '#8097F0',
    borderRadius: 12,
    paddingHorizontal: 4,
    marginLeft: 8,
    justifyContent: 'center',
    height: 120,
    width: 30,
  },
  moreButtonText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default CalendarEventList;