import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    fontSize: SIZES.HEADER_FONT,
    color: COLORS.HEADER,
    marginBottom: 10,
    fontWeight: '600',
  },
  switchContainer: {
    gap: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  label: {
    fontSize: SIZES.LABEL_FONT,
    color: COLORS.LABEL_INACTIVE,
  },
  labelActive: {
    color: COLORS.LABEL_ACTIVE,
  },
});