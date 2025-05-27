import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotCard: {
    width: '23%',
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotCardSelected: {
    backgroundColor: '#F090F1',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#000',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
});