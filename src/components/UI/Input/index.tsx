import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@constants/Colors';
import { TEXTS } from '@constants/Texts';
import { styles } from './styled';
import { VARIANT_CONFIG } from './variants';
import CodeInput from './components/CodeInput';
import StrengthBars from './components/StrengthBars';
import { formatTime } from '@utils';
import { formatPhoneNumber, unformatPhoneNumber } from './utils';

// Обновляем интерфейс InputProps
export interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  variant?: InputVariant;
  style?: StyleProp<ViewStyle>; // Исправляем тип для style
  isSuccess?: boolean;
  hasError?: boolean;
  hasValidationError?: boolean;
  subText?: string;
  passwordStrength?: number;
  showStrengthBar?: boolean;
  agreeMode?: boolean;
  onSubmitEditing?: () => void;
  confirmValue?: string;
  testID?: string;
}

export type InputVariant =
  | 'password'
  | 'map'
  | 'search'
  | 'user'
  | 'description'
  | 'time'
  | 'clearable'
  | 'copyable'
  | 'code'
  | 'phone'
  | 'confirm';

/**
 * Универсальный компонент ввода с поддержкой различных вариантов (пароль, код, телефон и т.д.).
 * @param props - Пропсы компонента.
 * @returns JSX.Element
 */
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
  onSubmitEditing,
  confirmValue,
  testID,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [internalPasswordStrength, setInternalPasswordStrength] = useState(0);
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

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  useEffect(() => {
    if (variant === 'password' && !passwordStrength) {
      const strength = checkPasswordStrength(value);
      setInternalPasswordStrength(strength);
    }
  }, [value, variant, passwordStrength]);

  if (variant === 'code') {
    return <CodeInput {...{ value, onChangeText, hasError, isSuccess, style, testID }} />;
  }

  if (variant === 'description') {
    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder={config.placeholder}
          placeholderTextColor={Colors.grayLight}
          value={value}
          onChangeText={onChangeText}
          multiline
          textAlignVertical="top"
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          {...rest}
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
          placeholderTextColor={Colors.grayLight}
          value={value}
          onChangeText={(text) => onChangeText(formatTime(text))}
          keyboardType="numeric"
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          {...rest}
        />
      </View>
    );
  }

  const handlePhoneNumberChange = (text: string) => {
    const digits = unformatPhoneNumber(text);
    const formatted = formatPhoneNumber(digits);
    onChangeText(digits);
    return formatted;
  };

  if (variant === 'phone') {
    const displayValue = formatPhoneNumber(value);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.iconContainer}>
          <TextInput
            style={[styles.input, isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
            placeholder={config.placeholder}
            placeholderTextColor={Colors.grayLight}
            value={displayValue}
            onChangeText={(text) => {
              const formatted = handlePhoneNumberChange(text);
            }}
            keyboardType="phone-pad"
            maxLength={18}
            onSubmitEditing={onSubmitEditing}
            testID={testID}
            {...rest}
          />
        </View>
        {subText && renderSubText(subText)}
      </View>
    );
  }

  if (variant === 'confirm') {
    const isMatch = value === confirmValue;
    const internalHasError = confirmValue ? !isMatch : false;
    const internalIsSuccess = confirmValue && isMatch;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.iconContainer}>
          <TextInput
            style={[styles.input, internalIsSuccess && styles.successBorder, internalHasError && styles.errorBorder]}
            placeholder={config.placeholder}
            placeholderTextColor={Colors.grayLight}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isSecure}
            onSubmitEditing={onSubmitEditing}
            testID={testID}
            {...rest}
          />
          {(secureTextEntry || config.icon) && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={secureTextEntry ? (internalIsSuccess ? undefined : toggleSecureEntry) : () => config.onPress?.(value, onChangeText)}
            >
              <Ionicons
                name={internalIsSuccess && secureTextEntry ? 'checkmark' : secureTextEntry ? (isSecure ? 'eye-off' : 'eye') : config.icon}
                size={24}
                color={internalIsSuccess && secureTextEntry ? '#00FF00' : Colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
        {internalHasError && (
          <Text style={styles.errorText}>{TEXTS.PASSWORDS_DO_NOT_MATCH}</Text>
        )}
        {agreeMode && !showStrengthBar && renderSubText(subText || TEXTS.LOGIN_TERMS)}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <TextInput
          style={[styles.input, isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
          placeholder={config.placeholder}
          placeholderTextColor={Colors.grayLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          {...rest}
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
      {agreeMode && !showStrengthBar && renderSubText(subText || TEXTS.LOGIN_TERMS)}
      {!agreeMode && subText && !showStrengthBar && renderSubText(subText)}
      {showStrengthBar && (passwordStrength ?? internalPasswordStrength) !== undefined && (
        <StrengthBars strength={passwordStrength ?? internalPasswordStrength} />
      )}
      {showStrengthBar && (passwordStrength ?? internalPasswordStrength) !== undefined && (
        value.length === 0 ? (
          <Text style={styles.errorText}>{TEXTS.ERROR_VALIDATION}</Text>
        ) : (passwordStrength ?? internalPasswordStrength) === 4 ? (
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