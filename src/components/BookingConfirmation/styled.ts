import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    borderRadius: 14,
    width: '100%',
    height: 190,
    marginBottom: 24,
    overflow: 'hidden', // Для корректного применения borderRadius
  },
  infoContainer: {
    borderRadius: 14,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 23,
    paddingVertical: 29,
  },
  infoContainer_small: {
    borderRadius: 14,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 23,
    paddingVertical: 20, // Отступы сверху и снизу для "стоимость"
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 30, // Фиксированное расстояние между колонками, как в примере
  },
  column: {
    // Устанавливаем фиксированные ширины, как в примере
    width: 125, // Ширина для "место", "дата", "фамилия и имя", "время"
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // "стоимость" и цена выровнены по краям
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular', // Используем шрифт из примера
  },
  value: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Roboto-Regular', // Используем шрифт из примера
  },
});