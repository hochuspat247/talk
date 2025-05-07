import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F090F10A',
    paddingVertical: 10,
    borderTopLeftRadius: 43, 
    borderTopRightRadius: 43, 
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F090F1',
    marginTop: 4,
  },
});