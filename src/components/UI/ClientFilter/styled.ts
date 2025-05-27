

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
  additionalContainer: {
  },
  periodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  periodButtonActive: {
    backgroundColor: COLORS.LABEL_ACTIVE,
  },
  periodText: {
    fontSize: 14,
    color: '#000',
  },
  periodTextActive: {
    color: '#fff',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 10,
  },
  dateRangeText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: COLORS.LABEL_ACTIVE,
  },
});