
import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@constants/Colors';
import { TEXTS } from '@constants/Texts';
import { styles } from '../styled';
import StrengthBars from '../components/StrengthBars';
import BaseInput from './BaseInput';
import { useSecureEntry } from '../hooks/useSecureEntry';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import { InputProps } from '../types'; 

interface PasswordInputProps extends InputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  onIconPress?: (value: string, onChangeText: (text: string) => void) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  style,
  isSuccess = false,
  hasError = false,
  hasValidationError = false,
  subText,
  passwordStrength,
  showStrengthBar = false,
  agreeMode = false,
  onSubmitEditing,
  testID,
  placeholder,
  icon,
  onIconPress,
  variant,
}) => {
  
  const isPasswordVariant = variant === 'password';
  const { isSecure, toggleSecureEntry } = useSecureEntry(isPasswordVariant);
  const internalPasswordStrength = usePasswordStrength(value, passwordStrength);

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

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <BaseInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPasswordVariant && isSecure} 
          style={[isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
        />
        {(isPasswordVariant || icon) && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={isPasswordVariant ? (isSuccess ? undefined : toggleSecureEntry) : () => onIconPress?.(value, onChangeText)}
          >
            <Ionicons
              name={isSuccess ? 'checkmark' : isPasswordVariant && isSecure ? 'eye-off' : isPasswordVariant ? 'eye' : icon!}
              size={28}
              color={isSuccess ? '#00FF00' : Colors.text}
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
      {hasError && !showStrengthBar && !subText && !agreeMode && (
        <Text style={styles.errorText}>{TEXTS.INPUT_ERROR_PASSWORD}</Text>
      )}
    </View>
  );
};

export default PasswordInput;