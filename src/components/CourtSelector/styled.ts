import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.text, // Заменяем '#000' на Colors.text (темно-серый)
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white, // Заменяем '#fff' на Colors.white
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  selectedCourtText: {
    fontSize: 16, // Размер текста выбранного корта
    color: Colors.text, // Заменяем '#000' на Colors.text (темно-серый)
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Оставляем как есть, так как это полупрозрачный цвет
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white, // Заменяем '#fff' на Colors.white
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
    padding: 20,
  },
  courtItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabled, // Заменяем '#ccc' на Colors.disabled (серый)
  },
  courtItemText: {
    fontSize: 16, // Размер текста в списке кортов
    color: Colors.text, // Заменяем '#000' на Colors.text (темно-серый)
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.primary, // Заменяем '#007AFF' на Colors.primary (синий)
  },
});