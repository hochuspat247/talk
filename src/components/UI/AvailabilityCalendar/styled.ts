import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DAY_CELL_SIZE = SCREEN_WIDTH / 7;

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  navArrow: {
    fontSize: 24,
    color: '#333',
    width: 32,
    textAlign: 'center',
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginHorizontal: 12,
    color: '#000',
  },
  weekDays: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 8,
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: DAY_CELL_SIZE,
    height: DAY_CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayBackground: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF20',
  },
  selectedBackground: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    color: '#000',
  },
  dayTextDisabled: {
    color: '#CCC',
  },
  dayTextToday: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  dotFree: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1CB37C',
  },
  dotBusy: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CCC',
  },
});