// src/components/Button/styled.ts
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
    color: Colors.white, // #FFFFFF
    textAlign: 'center',
  },
  textButtonText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.text, // #333333
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
    backgroundColor: Colors.primary, // #195CC5
  },
  secondary: {
    backgroundColor: Colors.secondary, // #FF7F7F
  },
  text: {
    backgroundColor: Colors.white, // #FFFFFF
  },
  accent: {
    backgroundColor: Colors.accent, // #5856D6
  },
  disabled: {
    backgroundColor: Colors.disabled, // #ADADAD
  },
  blocked: {
    backgroundColor: Colors.border, // #E0E0E0 (замена для #363636)
  },
  blockedText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.disabled, // #ADADAD (замена для #96989F)
    textAlign: 'center',
  },
  iconVariantSmall: {
    backgroundColor: Colors.accent, // #5856D6 (замена для #F4A8D6)
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconVariantFull: {
    backgroundColor: Colors.accent, // #5856D6 (замена для #F4A8D6)
    height: 61,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});