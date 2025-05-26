import React from 'react';
import { ScrollView, View } from 'react-native';
import { WeeklyEventsListProps } from './types';
import { styles } from './styled';
import DayBlock from './DayBlock';

const WeeklyEventsList: React.FC<WeeklyEventsListProps> = ({ days }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {days.map((day) => (
      <DayBlock key={day.date} day={day} />
    ))}
  </ScrollView>
);

export default WeeklyEventsList;