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
    color: Colors.disabled, // Серый цвет для текста времени
    textAlign: 'left',
    height: 20, // Фиксированная высота для timeText
    lineHeight: 20, // Центрируем текст по вертикали
  },
  slotWrapper: {
    marginLeft: 45, // Отступ слева, чтобы слот был сдвинут вправо
  },
  slot: {
    height: 60, // Высота одного слота
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Добавляем для размещения текста слева и имени справа
    paddingHorizontal: 10, // Отступы по горизонтали для текста
  },
  slotAvailable: {
    backgroundColor: Colors.white, // Белый цвет для доступных слотов
    borderWidth: 1,
    borderColor: Colors.border, // Светло-серый бордер
  },
  slotBooked: {
    backgroundColor: Colors.border, // Светло-серый цвет для забронированных/прошедших слотов
    borderWidth: 1,
    borderColor: Colors.border, // Светло-серый бордер
    opacity: 0.6, // Добавляем прозрачность для визуального отличия
  },
  slotSelected: {
    backgroundColor: Colors.primary, // Синий цвет для выбранных слотов
    borderWidth: 1,
    borderColor: Colors.primary, // Синий бордер
  },
  slotText: {
    fontSize: 16,
    color: Colors.text, // Цвет текста
    flex: 1, // Чтобы текст занимал доступное пространство слева
    textAlign: 'left', // Выравнивание текста слева
  },
  slotTextSelected: {
    color: Colors.white, // Белый цвет текста для выбранных слотов
  },
  bookedName: {
    fontSize: 14,
    color: '#5A5A5A', // Цвет имени
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
    backgroundColor: Colors.primary, // Синий цвет для точки
  },
  currentTimeLineBar: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.primary, // Синий цвет для линии
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.primary, // Синий бордер для линии
  },
});