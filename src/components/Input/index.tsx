import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from './styled';
import { Colors } from '@constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  isCode?: boolean;
  hasIcon?: boolean;
  hasError?: boolean;
  isSuccess?: boolean; // Новый проп для успешного ввода
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  isCode = false,
  hasIcon = false,
  hasError = false,
  isSuccess = false,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null); // Индекс активного поля
  const inputRefs = useRef<TextInput[]>([]); // Ссылки на поля ввода

  // Разбиваем значение на массив из 4 символов
  const codeValues = value.padEnd(4, '').split('').slice(0, 4);

  // Обработка ввода для каждого поля
  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) return; // Ограничиваем ввод одной цифрой
    const newCode = [...codeValues];
    newCode[index] = text;
    const updatedCode = newCode.join('');
    onChangeText(updatedCode);

    // Переход к следующему полю
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    // Если удалили символ, переходим к предыдущему полю
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (isCode) {
    return (
      <View style={styles.inputsCode}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref!)}
            style={[
              styles.code,
              hasError && styles.codeError, // Красная обводка при ошибке
              isSuccess && styles.codeSuccess, // Синяя обводка при успехе
              focusedIndex === index && styles.codeFocused, // Синяя обводка при фокусе
            ]}
            value={codeValues[index]}
            onChangeText={(text) => handleCodeChange(text, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={index === 0} // Автофокус на первом поле
          />
        ))}
      </View>
    );
  }

  if (hasIcon) {
    return (
      <View style={styles.iconContainer}>
        <TextInput
          style={styles.inputWithIcon}
          placeholder={placeholder}
          placeholderTextColor={Colors.disabled}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => setIsSecure(!isSecure)}>
          <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.disabled}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;