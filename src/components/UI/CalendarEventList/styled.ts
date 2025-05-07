import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    backgroundColor: '#8097F0',
    borderRadius: 12,
    paddingHorizontal: 4,
    marginLeft: 8,
    justifyContent: 'center',
    height: 120,
    width: 30,
  },
  moreButtonText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
  },
});