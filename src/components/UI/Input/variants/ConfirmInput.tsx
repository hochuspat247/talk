import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@constants/Colors';
import { TEXTS } from '@constants/Texts';
import { styles } from '../styled';
import BaseInput from './BaseInput';
import { useSecureEntry } from '../hooks/useSecureEntry';

interface ConfirmInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  confirmValue?: string;
  subText?: string;
  agreeMode?: boolean;
  onSubmitEditing?: () => void;
  testID?: string;
  placeholder?: string;
}

const ConfirmInput: React.FC<ConfirmInputProps> = ({
  value,
  onChangeText,
  style,
  confirmValue,
  subText,
  agreeMode = false,
  onSubmitEditing,
  testID,
  placeholder,
}) => {
  const { isSecure, toggleSecureEntry } = useSecureEntry(true);
  const isMatch = value === confirmValue;
  const internalHasError = confirmValue ? !isMatch : false;
  const internalIsSuccess = confirmValue && isMatch;

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
          style={[internalIsSuccess && styles.successBorder, internalHasError && styles.errorBorder]}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={internalIsSuccess ? undefined : toggleSecureEntry}
        >
          <Ionicons
            name={internalIsSuccess ? 'checkmark' : isSecure ? 'eye-off' : 'eye'}
            size={28} 
            color={internalIsSuccess ? '#00FF00' : Colors.text}
          />
        </TouchableOpacity>
      </View>
      {internalHasError && (
        <Text style={styles.errorText}>{TEXTS.PASSWORDS_DO_NOT_MATCH}</Text>
      )}
      {agreeMode && renderSubText(subText || TEXTS.LOGIN_TERMS)}
    </View>
  );
};

export default ConfirmInput;