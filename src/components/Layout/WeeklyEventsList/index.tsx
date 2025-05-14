// WeeklyEventsList.tsx

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import DetailedEventCard from '@components/UI/DetailedEventCard';

moment.locale('ru');

export type DayEvents = {
  date: string; // формат YYYY-MM-DD
  events: Array<{
    id: string;
    title: string;
    timeRange: string;    // например "15:00–16:00"
    location: string;     // например `"BEAUTY LAB STORE", Лубянский пр., стр. 1`
    status: 'Активно' | 'Подтверждено' | string;
    price: string;        // например "1 500 ₽"
  }>;
};

export interface WeeklyEventsListProps {
  days: DayEvents[];
}

const WeeklyEventsList: React.FC<WeeklyEventsListProps> = ({ days }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {days.map(({ date, events }) => {
      const m = moment(date, 'YYYY-MM-DD');
      const dayName = m.format('ddd').toUpperCase();   // ПН, ВТ, СР ...
      const dayNum = m.format('DD.MM');                 // 12.12, 13.12...
      const hasEvents = events.length > 0;

      return (
        <View key={date} style={styles.dayBlock}>
          <View style={styles.header}>
            <View style={styles.dateWrapper}>
              <Text style={styles.dayName}>{dayName}</Text>
              <Text style={styles.dayNum}>{dayNum}</Text>
            </View>
            {!hasEvents && (
              <Text style={styles.noRecordInline}>Нет записи</Text>
            )}
          </View>

          {hasEvents && events.map(evt => (
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
    })}
  </ScrollView>
);

export default WeeklyEventsList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  dayBlock: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8097F0',
    marginRight: 8,
  },
  dayNum: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8097F0',
  },
  noRecordInline: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  cardWrapper: {
    marginVertical: 4,
  },
});
