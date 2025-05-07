import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CalendarEventCard from '@components/UI/CalendarEventCard';
import { styles } from './styled';
import { CalendarEventListProps, Event } from './types';
import { formatTotalDuration, parseDurationToMinutes } from './utils';
import { MAX_VISIBLE_EVENTS } from './constants';

/**
 * Компонент списка событий в календаре.
 * Отображает события в виде карточек с возможностью показать дополнительные события.
 *
 * @param {CalendarEventListProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент списка событий.
 */
const CalendarEventList: React.FC<CalendarEventListProps> = ({ events, onMorePress, isMini = true }) => {
  if (!events || events.length === 0) {
    return <View style={styles.container} />;
  }

  const visibleEvents: Event[] = events.slice(0, MAX_VISIBLE_EVENTS).filter(event => event != null);
  const hiddenEventsCount = events.length > MAX_VISIBLE_EVENTS ? events.length - MAX_VISIBLE_EVENTS : 0;

  const totalDurationMinutes = events.reduce((total, event) => {
    if (!event || !event.duration) return total;
    return total + parseDurationToMinutes(event.duration);
  }, 0);

  const totalDuration = formatTotalDuration(totalDurationMinutes);

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {visibleEvents.map((event, index) => (
          <View
            key={`${event.time}-${event.service}-${index}`}
            style={styles.cardWrapper}
          >
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

export default CalendarEventList;