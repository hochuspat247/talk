import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../styled';
import { InputProps } from '../types';

/**
 * Компонент для ввода кода верификации (4 цифры).
 * Каждый символ вводится в отдельное поле, с автоматическим переходом фокуса.
 * @param props - Пропсы компонента.
 * @param props.value - Текущий код (строка из 4 цифр).
 * @param props.onChangeText - Функция для обновления кода.
 * @param props.hasError - Показывать состояние ошибки.
 * @param props.isSuccess - Показывать состояние успеха.
 * @param props.style - Стили контейнера.
 * @param props.testID - Идентификатор для тестов.
 * @returns JSX.Element
 */
const CodeInput: React.FC<InputProps> = ({
  value,
  onChangeText,
  hasError,
  isSuccess,
  style,
  testID,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<TextInput[]>([]);
  const codeValues = value.padEnd(4, '').split('').slice(0, 4);

  // Логируем изменение value
  useEffect(() => {
    console.log('CodeInput value:', value);
  }, [value]);

  const handleCodeChange = useCallback((text: string, index: number) => {
    if (text.length > 1) return;
    const newCode = [...codeValues];
    newCode[index] = text;
    const updatedCode = newCode.join('');
    onChangeText(updatedCode);
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [codeValues, onChangeText]);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputRefs.current[i] = ref!)}
            style={[
              styles.codeInput,
              hasError && styles.codeInputError,
              isSuccess && styles.codeInputSuccess,
              focusedIndex === i && styles.codeInputFocused,
            ]}
            value={codeValues[i]}
            onChangeText={(text) => handleCodeChange(text, i)}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={i === 0}
            testID={testID ? `${testID}-${i}` : undefined}
            accessibilityLabel={`Code digit ${i + 1}`}
          />
        ))}
      </View>
    </View>
  );
};

export default CodeInput;