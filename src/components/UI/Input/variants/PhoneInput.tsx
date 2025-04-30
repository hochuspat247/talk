import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../styled';
import BaseInput from './BaseInput';
import { formatPhoneNumber, unformatPhoneNumber } from '../utils';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  isSuccess?: boolean;
  hasError?: boolean;
  hasValidationError?: boolean;
  subText?: string;
  onSubmitEditing?: () => void;
  testID?: string;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  style,
  isSuccess = false,
  hasError = false,
  hasValidationError = false,
  subText,
  onSubmitEditing,
  testID,
  placeholder,
}) => {
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

  const handlePhoneNumberChange = (text: string) => {
    const digits = unformatPhoneNumber(text);
    const formatted = formatPhoneNumber(digits);
    onChangeText(digits);
    return formatted;
  };

  const displayValue = formatPhoneNumber(value);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <BaseInput
          value={displayValue}
          onChangeText={(text) => handlePhoneNumberChange(text)}
          placeholder={placeholder}
          keyboardType="phone-pad"
          maxLength={18}
          style={[isSuccess && styles.successBorder, (hasError || hasValidationError) && styles.errorBorder]}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
        />
      </View>
      {subText && renderSubText(subText)}
    </View>
  );
};

export default PhoneInput;