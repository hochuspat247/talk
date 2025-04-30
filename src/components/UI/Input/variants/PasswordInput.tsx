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

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  isSuccess?: boolean;
  hasError?: boolean;
  hasValidationError?: boolean;
  subText?: string;
  passwordStrength?: number;
  showStrengthBar?: boolean;
  agreeMode?: boolean;
  onSubmitEditing?: () => void;
  testID?: string;
  placeholder?: string;
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
}) => {
  const { isSecure, toggleSecureEntry } = useSecureEntry(true);
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
          secureTextEntry={isSecure}
          style={[isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
        />
        {(isSecure || icon) && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={isSecure ? (isSuccess ? undefined : toggleSecureEntry) : () => onIconPress?.(value, onChangeText)}
          >
            <Ionicons
              name={isSuccess ? 'checkmark' : isSecure ? 'eye-off' : icon || 'eye'}
              size={28} // Увеличиваем размер иконки
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