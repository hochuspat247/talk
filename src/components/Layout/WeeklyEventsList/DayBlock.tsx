import React from 'react';
import { View, Text } from 'react-native';
import DetailedEventCard from '@components/UI/DetailedEventCard';
import { formatDate } from './utils';
import { styles } from './styled';
import { DayEvents } from './types';

interface DayBlockProps {
  day: DayEvents;
}

const DayBlock: React.FC<DayBlockProps> = ({ day }) => {
  const { date, events } = day;
  const { dayName, dayNum } = formatDate(date);
  const hasEvents = events.length > 0;

  return (
    <View style={styles.dayBlock}>
      <View style={styles.header}>
        <View style={styles.dateWrapper}>
          <Text style={styles.dayName}>{dayName}</Text>
          <Text style={styles.dayNum}>{dayNum}</Text>
        </View>
        {!hasEvents && <Text style={styles.noRecordInline}>Нет записи</Text>}
      </View>
      {hasEvents &&
        events.map((evt) => (
          <View key={evt.id} style={styles.cardWrapper}>
            <DetailedEventCard
              title={evt.title}
              timeRange={evt.timeRange}
              location={evt.location}
              status={evt.status}
              price={evt.price}
            />
          </View>
        ))}
    </View>
  );
};

export default DayBlock;