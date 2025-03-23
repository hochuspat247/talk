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
    color: '#888', // Серый цвет для времени
    textAlign: 'left',
    height: 20, // Фиксированная высота для timeText
    lineHeight: 20, // Центрируем текст по вертикали
  },
  slotWrapper: {
    marginLeft: 45, // Отступ слева, чтобы слот был сдвинут вправо
  },
  slot: {
    height: 60, // Высота одного слота
    backgroundColor: '#fff', // Белый цвет для свободных слотов
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotAvailable: {
    backgroundColor: '#fff', // Свободные слоты — белые
  },
  slotBooked: {
    backgroundColor: '#E0E0E0', // Занятые слоты — серые
  },
  slotSelected: {
    backgroundColor: '#007AFF', // Синий цвет для выбранных слотов
  },
  slotText: {
    fontSize: 16,
    color: Colors.text,
  },
  slotTextSelected: {
    color: '#fff', // Белый текст для выбранных слотов
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
    backgroundColor: '#007AFF', // Синий цвет точки
  },
  currentTimeLineBar: {
    flex: 1,
    height: 2,
    backgroundColor: '#007AFF', // Синий цвет линии
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
});