// src/components/Input/utils.ts
import * as Clipboard from 'expo-clipboard';

export const handleClear = (_value: string, onChangeText: (text: string) => void) => () => onChangeText('');

export const handleCopy = (value: string, _onChangeText: (text: string) => void) => async () => {
  if (value) {
    await Clipboard.setStringAsync(value);
  }
};

// Функция форматирования номера телефона
export const formatPhoneNumber = (value: string): string => {
  // Удаляем всё, кроме цифр
  const digits = value.replace(/\D/g, '');
  
  // Если длина меньше 1, возвращаем пустую строку или просто +
  if (digits.length < 1) return '';

  // Предполагаем, что номер начинается с +7 (для России)
  let formatted = '+7';

  if (digits.length > 1) {
    // Добавляем код региона в скобках, например: +7 (123
    const code = digits.substring(1, 4);
    formatted += ` (${code}`;
  }

  if (digits.length > 4) {
    // Добавляем первую часть номера, например: +7 (123) 456
    const firstPart = digits.substring(4, 7);
    formatted += `) ${firstPart}`;
  }

  if (digits.length > 7) {
    // Добавляем вторую часть номера с дефисом, например: +7 (123) 456-78
    const secondPart = digits.substring(7, 9);
    formatted += `-${secondPart}`;
  }

  if (digits.length > 9) {
    // Добавляем последнюю часть номера, например: +7 (123) 456-78-90
    const thirdPart = digits.substring(9, 11);
    formatted += `-${thirdPart}`;
  }

  return formatted;
};

// Функция для получения только цифр из отформатированного номера
export const unformatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};