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
  title: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 18,
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 24,
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
  },
});