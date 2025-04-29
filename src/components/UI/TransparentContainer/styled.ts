// src/components/TransparentContainer/styled.ts
import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Colors.transparentWhite10, // rgba(255, 255, 255, 0.1)
    borderRadius: 20,
    padding: 8,
  },
});