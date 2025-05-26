import React from 'react';
import { View, Text } from 'react-native';
import { WEEK_DAYS } from './utils';
import { styles } from './styled';

const WeekDays: React.FC = () => (
  <View style={styles.weekDays}>
    {WEEK_DAYS.map((day) => (
      <Text key={day} style={styles.weekDayText}>
        {day}
      </Text>
    ))}
  </View>
);

export default WeekDays;