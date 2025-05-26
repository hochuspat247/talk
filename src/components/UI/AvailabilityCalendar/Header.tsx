import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styled';
import moment from 'moment';

interface HeaderProps {
  currentMonth: moment.Moment;
  onPrev: () => void;
  onNext: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentMonth, onPrev, onNext }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onPrev}>
      <Text style={styles.navArrow}>‹</Text>
    </TouchableOpacity>
    <Text style={styles.monthLabel}>{currentMonth.format('MMMM')}</Text>
    <TouchableOpacity onPress={onNext}>
      <Text style={styles.navArrow}>›</Text>
    </TouchableOpacity>
  </View>
);

export default Header;