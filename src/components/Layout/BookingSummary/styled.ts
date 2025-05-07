import { StyleSheet } from 'react-native';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontFamily: FONTS.MANROPE_EXTRA_BOLD,
    fontSize: 20,
    color: '#8097F0',
    marginRight: 10,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  infoLabel: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    color: '#37393F66',
    marginRight: 3,
  },
  infoValue: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    color: '#37393F66',
  },
});