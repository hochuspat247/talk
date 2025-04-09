import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  button: {
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 21.56,
    color: Colors.white,
    textAlign: 'center',
  },
  enabled: {
    backgroundColor: Colors.primary, // Синий фон для primary
  },
  disabled: {
    backgroundColor: Colors.disabled, // Серый фон для disabled
  },
  text: {
    backgroundColor: 'transparent', // Прозрачный фон для text
  },
  textButtonText: {
    color: Colors.text, // Чёрный текст для text
  },
  error: {
    backgroundColor: Colors.error, // Красный фон для error
  },
  errorButtonText: {
    color: Colors.white, // Белый текст для error
  },
});