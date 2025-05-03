import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slotsContainer: {
    position: 'relative',
  },
  timeText: {
    fontSize: 14,
    color: Colors.disabled,
    textAlign: 'left',
    height: 20,
    lineHeight: 20,
  },
  slotWrapper: {
    marginLeft: 45,
    borderWidth: 1, // Добавляем рамку вокруг слота
    borderColor: Colors.border,
    borderRadius: 8,
    marginVertical: 4,
    padding: 4,
  },
  emptySlot: {
    height: 60,
    borderWidth: 1, // Добавляем рамку для пустого слота
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  eventListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4, // Добавляем отступы внутри списка
  },
  eventListContent: {
    flexGrow: 1,
    paddingRight: 16,
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentTimeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9F69',
  },
  currentTimeLineBar: {
    flex: 1,
    height: 2,
    backgroundColor: '#FF9F69',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FF9F69',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FBFBFB',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dateBlock: {
    backgroundColor: '#EEF0F9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    marginBottom: 5,
  },
  timeBlock: {
    backgroundColor: '#EEF0F9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  modalTitleTime: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: '#007AFF',
  },
  modalTitleDay: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: '#000000',
  },
  modalScroll: {
    flexGrow: 1,
  },
  modalEvent: {
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 16,
    color: Colors.white,
  },
});