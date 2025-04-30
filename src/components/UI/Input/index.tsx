// src/components/Input/index.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@constants/Colors';
import { TEXTS } from '@constants/Texts';
import { styles } from './styled';
import { InputProps } from './types';
import { VARIANT_CONFIG } from './variants';
import CodeInput from './components/CodeInput';
import StrengthBars from './components/StrengthBars';
import { formatTime } from '@utils/formatters';
import { formatPhoneNumber, unformatPhoneNumber } from './utils';

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  secureTextEntry = false,
  variant = 'password',
  style,
  isSuccess = false,
  hasError = false,
  hasValidationError = false,
  subText,
  passwordStrength,
  showStrengthBar = false,
  agreeMode = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const toggleSecureEntry = () => setIsSecure(!isSecure);
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.password;

  const renderSubText = (message: string) => {
    const parts = message.split(/(политикой и условиями)/);
    return (
      <Text style={styles.subText}>
        {parts.map((part, index) => (
          <Text key={index} style={part === 'политикой и условиями' ? styles.subTextHighlighted : undefined}>
            {part}
          </Text>
        ))}
      </Text>
    );
  };

  // Обработчик ввода для номера телефона
  const handlePhoneNumberChange = (text: string) => {
    const digits = unformatPhoneNumber(text);
    const formatted = formatPhoneNumber(digits);
    onChangeText(digits); // Передаём только цифры в onChangeText
    return formatted; // Возвращаем отформатированную строку для отображения
  };

  if (variant === 'code') {
    return <CodeInput {...{ value, onChangeText, hasError, isSuccess, style }} />;
  }

  if (variant === 'description') {
    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder={config.placeholder}
          placeholderTextColor={Colors.grayLight} // Используем #ccc
          value={value}
          onChangeText={onChangeText}
          multiline
          textAlignVertical="top"
        />
      </View>
    );
  }

  if (variant === 'time') {
    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={styles.timeInput}
          placeholder={config.placeholder}
          placeholderTextColor={Colors.grayLight} // Используем #ccc
          value={value}
          onChangeText={(text) => onChangeText(formatTime(text))}
          keyboardType="numeric"
        />
      </View>
    );
  }

  if (variant === 'phone') {
    const displayValue = formatPhoneNumber(value); // Отображаем отформатированный номер

    return (
      <View style={[styles.container, style]}>
        <View style={styles.iconContainer}>
          <TextInput
            style={[styles.input, isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
            placeholder={config.placeholder}
            placeholderTextColor={Colors.grayLight} // Используем #ccc
            value={displayValue}
            onChangeText={(text) => {
              const formatted = handlePhoneNumberChange(text);
            }}
            keyboardType="phone-pad"
            maxLength={18}
          />
        </View>
        {subText && renderSubText(subText)}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <TextInput
          style={[styles.input, isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
          placeholder={config.placeholder}
          placeholderTextColor={Colors.grayLight} // Используем #ccc
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        {(secureTextEntry || config.icon) && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={secureTextEntry ? (isSuccess ? undefined : toggleSecureEntry) : () => config.onPress?.(value, onChangeText)}
          >
            <Ionicons
              name={isSuccess && secureTextEntry ? 'checkmark' : secureTextEntry ? (isSecure ? 'eye-off' : 'eye') : config.icon}
              size={24}
              color={isSuccess && secureTextEntry ? '#00FF00' : Colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
      {agreeMode && !showStrengthBar && renderSubText(TEXTS.LOGIN_TERMS)}
      {!agreeMode && subText && !showStrengthBar && renderSubText(subText)}
      {showStrengthBar && passwordStrength !== undefined && <StrengthBars strength={passwordStrength} />}
      {showStrengthBar && passwordStrength !== undefined && (
        value.length === 0 ? (
          <Text style={styles.errorText}>{TEXTS.ERROR_VALIDATION}</Text>
        ) : passwordStrength === 4 ? (
          <Text style={styles.subText}>{TEXTS.SUCCESS_PASSWORD}</Text>
        ) : (
          <Text style={styles.errorText}>{TEXTS.INPUT_ERROR_PASSWORD}</Text>
        )
      )}
      {variant === 'password' && hasError && !showStrengthBar && !subText && !agreeMode && (
        <Text style={styles.errorText}>{TEXTS.INPUT_ERROR_PASSWORD}</Text>
      )}
    </View>
  );
};

export default Input;