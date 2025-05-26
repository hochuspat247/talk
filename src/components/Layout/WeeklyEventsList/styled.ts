import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  dayBlock: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8097F0',
    marginRight: 8,
  },
  dayNum: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8097F0',
  },
  noRecordInline: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  cardWrapper: {
    marginVertical: 4,
  },
});