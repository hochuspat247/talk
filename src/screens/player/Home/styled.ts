import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    gap: 8,
    
  },
  bookButtonWrapper: {
    position: 'absolute',
    bottom: -20, // высота BottomNavigator + небольшой отступ
    borderRadius: 30,
    height: 130,
    left:22,
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(210, 210, 210, 0.24)',
  },

});