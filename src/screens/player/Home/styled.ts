import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16, // Отступ снизу для контента в ScrollView
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodSwitch: {
    marginVertical: 10, // Отступ сверху и снизу для PeriodSwitch
  },
  navWrapper: {
    marginBottom: 8, // Отступ снизу для BottomNavigator
  },
});