import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '@constants/client/profile';

export const styles = StyleSheet.create({
  componentWrapper: {
    marginBottom: SIZES.MARGINS.COMPONENT_BOTTOM,
  },
  componentWrapperLast: {
    marginBottom: 0,
  },
  label: {
    fontSize: SIZES.FONT_SIZES.LABEL,
    color: COLORS.LABEL,
    marginBottom: 5,
  },
});