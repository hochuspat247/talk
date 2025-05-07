
import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 61,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.white, 
    textAlign: 'center',
  },
  textButtonText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.text, 
  },
  iconNoFill: {
    backgroundColor: 'transparent',
  },
  icon: {
    marginLeft: 8,
  },
  iconButtonText: {
    display: 'none',
  },
  primary: {
    backgroundColor: Colors.primary, 
  },
  secondary: {
    backgroundColor: Colors.secondary, 
  },
  text: {
    backgroundColor: Colors.white, 
  },
  accent: {
    backgroundColor: Colors.accent, 
  },
  disabled: {
    backgroundColor: Colors.disabled, 
  },
  blocked: {
    backgroundColor: Colors.primary, 
  },
  blockedText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.blockedText, 
    textAlign: 'center',
  },
  iconVariantSmall: {
    backgroundColor: Colors.accent, 
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconVariantFull: {
    backgroundColor: Colors.accent, 
    height: 61,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});