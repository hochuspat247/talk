import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Логотип слева, иконки справа
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.MANROPE_BOLD,
    fontSize: 31,
    color: Colors.text,
  },
  subtitleContainer: {
    marginTop: 4, // Отступ сверху от верхнего блока
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_BOLD,
    fontSize: 24,
    color: Colors.text,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.notification,
  },
  avatarContainer: {
    marginLeft: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 160,
    backgroundColor: Colors.grayLight,
  },
});