import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6', 
    borderRadius: 16, 
    paddingHorizontal: 8, 
    paddingVertical: 6.5, 
  },
  button: {
    flex: 1,
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 16, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#FBFBFB', 
  },
  buttonText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 14,
    color: '#999999', 
  },
  selectedButtonText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    color: Colors.text, 
  },
});