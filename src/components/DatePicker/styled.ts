import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

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
    backgroundColor: Colors.white, // Заменяем '#fff' на Colors.white
    flex: 1,
    width: '100%',
    height: 59,
    paddingHorizontal: 10, // Увеличиваем ширину блока через padding
  },
  dateText: {
    fontSize: 16,
    color: Colors.text, // Заменяем '#000' на Colors.text (темно-серый)
  },
  weekendText: {
    color: Colors.error, // Заменяем 'red' на Colors.error (красный)
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
  },
  dotAvailable: {
    backgroundColor: Colors.success, // Заменяем 'green' на Colors.success (зеленый)
  },
  dotUnavailable: {
    backgroundColor: Colors.disabled, // Заменяем '#ccc' на Colors.disabled (серый)
  },
});