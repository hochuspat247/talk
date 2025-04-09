import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Чтобы контейнер занимал доступное пространство
  },
  slotsContainer: {
    position: 'relative',
  },
  timeText: {
    fontSize: 14,
    color: Colors.disabled, // Заменяем '#888' на Colors.disabled (серый)
    textAlign: 'left',
    height: 20, // Фиксированная высота для timeText
    lineHeight: 20, // Центрируем текст по вертикали
  },
  slotWrapper: {
    marginLeft: 45, // Отступ слева, чтобы слот был сдвинут вправо
  },
  slot: {
    height: 60, // Высота одного слота
    backgroundColor: Colors.white, // Заменяем '#fff' на Colors.white
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Добавляем для размещения текста слева и имени справа
    paddingHorizontal: 10, // Отступы по горизонтали для текста
  },
  slotAvailable: {
    backgroundColor: Colors.white, // Заменяем '#fff' на Colors.white
  },
  slotBooked: {
    backgroundColor: Colors.border, // Заменяем '#E0E0E0' на Colors.border (светло-серый)
  },
  slotSelected: {
    backgroundColor: Colors.primary, // Заменяем '#007AFF' на Colors.primary (синий)
  },
  slotText: {
    fontSize: 16,
    color: Colors.text, // Уже использует Colors.text
    flex: 1, // Чтобы текст занимал доступное пространство слева
    textAlign: 'left', // Выравнивание текста слева
  },
  slotTextSelected: {
    color: Colors.white, // Заменяем '#fff' на Colors.white
  },
  bookedName: {
    fontSize: 14,
    color: '#5A5A5A', // Цвет имени, как указано
    textAlign: 'right', // Выравнивание имени справа
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentTimeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary, // Заменяем '#007AFF' на Colors.primary (синий)
  },
  currentTimeLineBar: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.primary, // Заменяем '#007AFF' на Colors.primary (синий)
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.primary, // Заменяем '#007AFF' на Colors.primary (синий)
  },
});