// src/components/styled.ts

import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors'; // Используем @ для импорта

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingTop: 53,
    paddingHorizontal: 22,
  },
});
