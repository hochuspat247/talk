import { StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 18,
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
  },
  errorText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  resendText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.grayMedium,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  resendLink: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: 20,
  },
});