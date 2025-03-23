import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: 50, // Фиксированная ширина для всех контейнеров
    height: 59, // Фиксированная высота, совпадающая с selectedDateContainer
  },
  selectedDateContainer: {
    borderRadius: 14,
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: 59,
    paddingHorizontal: 10, // Увеличиваем ширину блока через padding
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  weekendText: {
    color: 'red', // Красный цвет для выходных
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
  },
  dotAvailable: {
    backgroundColor: 'green', // Зеленый цвет, если есть места
  },
  dotUnavailable: {
    backgroundColor: '#ccc', // Серый цвет, если мест нет
  },
});