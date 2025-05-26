import { StyleSheet } from 'react-native';
import { styles } from './styled';

export const getStatusStyles = (status: string) => {
  const isActive = status === 'Активно';
  return {
    statusBadgeStyle: isActive
      ? styles.statusBadgeActive
      : styles.statusBadgeConfirmed,
    statusTextStyle: isActive
      ? styles.statusTextActive
      : styles.statusTextConfirmed,
  };
};