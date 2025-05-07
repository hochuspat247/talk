import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from './constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: SIZES.FONT_SIZES.LABEL,
    color: COLORS.LABEL,
    marginRight: SIZES.PADDINGS.MARGINS.LABEL_RIGHT,
  },
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    paddingVertical: SIZES.PADDINGS.BUTTON_VERTICAL,
    paddingHorizontal: SIZES.PADDINGS.BUTTON_HORIZONTAL,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.BORDER_RADIUS,
    backgroundColor: COLORS.BUTTON_DEFAULT,
  },
  buttonLeft: {
    marginRight: SIZES.PADDINGS.MARGINS.BUTTON_RIGHT,
  },
  selectedButton: {
    backgroundColor: COLORS.BUTTON_SELECTED,
  },
  text: {
    fontSize: SIZES.FONT_SIZES.BUTTON,
    color: COLORS.TEXT_DEFAULT,
  },
  selectedText: {
    color: COLORS.TEXT_SELECTED,
  },
});