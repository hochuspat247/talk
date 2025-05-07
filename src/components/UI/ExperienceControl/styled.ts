import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  label: {
    fontSize: SIZES.LABEL_FONT,
    color: COLORS.LABEL,
    marginBottom: SIZES.LABEL_MARGIN_BOTTOM,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.BUTTON_GAP,
  },
  button: {
    paddingVertical: SIZES.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: SIZES.BUTTON_PADDING_HORIZONTAL,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BUTTON_DEFAULT,
    borderRadius: 6,
  },
  selectedButton: {
    backgroundColor: COLORS.BUTTON_SELECTED,
  },
  text: {
    fontSize: SIZES.BUTTON_FONT,
    color: COLORS.TEXT_DEFAULT,
  },
  selectedText: {
    color: COLORS.TEXT_SELECTED,
  },
});