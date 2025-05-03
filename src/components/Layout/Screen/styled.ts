import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16, // Отступы 16 пикселей по бокам
    paddingTop: 20, // Отступ сверху
    paddingBottom: 21, // Отступ снизу
    flexGrow: 1, // Для корректной работы ScrollView
    backgroundColor: '#F5F5F5', // Белый цвет фона
  },
});