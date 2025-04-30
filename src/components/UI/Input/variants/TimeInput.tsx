import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from '../styled';
import { formatTime } from '@utils';
import BaseInput from './BaseInput';

interface TimeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  onSubmitEditing?: () => void;
  testID?: string;
  placeholder?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
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
      onChangeText={(text) => onChangeText(formatTime(text))}
      style={[styles.timeInput, style]}
      placeholder={placeholder}
      keyboardType="numeric"
      onSubmitEditing={onSubmitEditing}
      testID={testID}
    />
  );
};

export default TimeInput;