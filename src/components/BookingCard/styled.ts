import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  topBlock: {
    padding: 15,
    borderRadius: 14,
  },
  bottomBlock: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  time: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  dateValue: {
    fontSize: 20,
    color: '#fff',
  },
  timeValue: {
    fontSize: 20,
    color: '#fff',
  },
  court: {
    fontSize: 12,
    color: '#000',
    opacity: 0.7,
  },
  courtValue: {
    fontSize: 20,
    color: '#000',
  },
  buyerLabel: {
    fontSize: 12, // Такой же размер, как у court
    color: '#000',
    opacity: 0.7, // Такая же прозрачность
  },
  buyerName: {
    fontSize: 20, // Такой же размер, как у courtValue
    color: '#000',
  },
  racketsIcon: {
    width: 80,
    height: 80,
  },
});