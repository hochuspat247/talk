
import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Colors.transparentWhite10, 
    borderRadius: 20,
    paddingHorizontal: 8, 
    paddingTop: 24, 
    paddingBottom: 31, 
    flexDirection: 'column',
    gap: 12, 
  },
});