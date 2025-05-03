import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6', // Серый фон контейнера
    borderRadius: 16, // Закругление контейнера
    paddingHorizontal: 8, // Отступы по бокам 8px
    paddingVertical: 6.5, // Отступы сверху и снизу 6.5px
  },
  button: {
    flex: 1,
    paddingVertical: 8, // Внутренние отступы кнопки (сохранены для текста)
    paddingHorizontal: 12, // Внутренние отступы кнопки (сохранены)
    borderRadius: 16, // Закругление кнопок
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#FBFBFB', // Белый фон для активной кнопки
  },
  buttonText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 14,
    color: '#999999', // Серый цвет для неактивных кнопок
  },
  selectedButtonText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    color: Colors.text, // Чёрный цвет для активной кнопки
  },
});