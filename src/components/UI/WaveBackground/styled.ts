// src/components/WavesBackground/styled.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  orange: {
    zIndex: 0, // Под
  },
  yellow: {
    zIndex: 1, // Над
  },
});