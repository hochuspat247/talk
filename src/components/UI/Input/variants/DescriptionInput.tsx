import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from '../styled';
import BaseInput from './BaseInput';

interface DescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  onSubmitEditing?: () => void;
  testID?: string;
  placeholder?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChangeText,
  style,
  onSubmitEditing,
  testID,
  placeholder,
}) => {
  return (
    <BaseInput
      value={value}
      onChangeText={onChangeText}
      style={[styles.descriptionInput, style]}
      placeholder={placeholder}
      multiline
      textAlignVertical="top"
      onSubmitEditing={onSubmitEditing}
      testID={testID}
    />
  );
};

export default DescriptionInput;