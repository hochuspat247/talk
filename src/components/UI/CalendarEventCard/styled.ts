import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2F6',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 4,
    width: '100%',
    maxWidth: 300,
  },
  containerMini: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    width: 107,
    height: 120,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statusContainer: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
  },
  statusContainerMini: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  symbolContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    width: 18,
    alignItems: 'center',
  },
  symbolContainerMini: {
    borderRadius: 4,
    paddingVertical: 2,
    width: 14,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
  },
  statusTextMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 8,
  },
  statusSymbol: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
  },
  statusSymbolMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 10,
  },
  salonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  salonName: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.text,
    marginLeft: 4,
    flexShrink: 1,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceContainerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  service: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: Colors.text,
    flexShrink: 1,
  },
  serviceMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
    flexShrink: 1,
  },
  serviceSuffix: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 4,
  },
  serviceSuffixMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
    marginLeft: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  masterInfoMini: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginBottom: 4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarMini: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  masterDetailsMini: {
    flexShrink: 1,
  },
  masterName: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 10,
    color: Colors.text,
  },
  masterNameMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 8,
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingContainerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 7,
    color: Colors.text,
  },
  ratingMini: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 6,
    color: Colors.text,
  },
  timeAndIconContainerMini: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  timeContainerMini: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  time: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
  },
  timeMini: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 12,
    color: Colors.text,
  },
  duration: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.text,
  },
  durationMini: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.text,
  },
  timeLabelMini: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 5,
    color: '#999999',
  },
  iconContainer: {
    backgroundColor: '#9999991A',
    borderRadius: 10,
    padding: 4,
  },
  iconContainerMini: {
    backgroundColor: '#9999991A',
    borderRadius: 8,
    padding: 2,
  },
});