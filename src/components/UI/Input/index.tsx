import React from 'react';
import { VARIANT_CONFIG } from './variants';
import PasswordInput from './variants/PasswordInput';
import PhoneInput from './variants/PhoneInput';
import ConfirmInput from './variants/ConfirmInput';
import DescriptionInput from './variants/DescriptionInput';
import TimeInput from './variants/TimeInput';
import CodeInput from './components/CodeInput';
import { InputProps, InputVariant } from './types';

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  secureTextEntry = false,
  variant = 'password',
  style,
  isSuccess,
  hasError,
  hasValidationError,
  subText,
  passwordStrength,
  showStrengthBar,
  agreeMode,
  onSubmitEditing,
  confirmValue,
  testID,
  ...rest
}) => {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.password;

  switch (variant) {
    case 'code':
      return <CodeInput {...{ value, onChangeText, hasError, isSuccess, style, testID }} />;
    case 'description':
      return (
        <DescriptionInput
          value={value}
          onChangeText={onChangeText}
          style={style}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          placeholder={config.placeholder}
        />
      );
    case 'time':
      return (
        <TimeInput
          value={value}
          onChangeText={onChangeText}
          style={style}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          placeholder={config.placeholder}
        />
      );
    case 'phone':
      return (
        <PhoneInput
          value={value}
          onChangeText={onChangeText}
          style={style}
          isSuccess={isSuccess}
          hasError={hasError}
          hasValidationError={hasValidationError}
          subText={subText}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          placeholder={config.placeholder}
        />
      );
    case 'confirm':
      return (
        <ConfirmInput
          value={value}
          onChangeText={onChangeText}
          style={style}
          confirmValue={confirmValue}
          subText={subText}
          agreeMode={agreeMode}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          placeholder={config.placeholder}
        />
      );
    case 'password':
    case 'map':
    case 'search':
    case 'user':
    case 'clearable':
    case 'copyable':
    default:
      return (
        <PasswordInput
          value={value}
          onChangeText={onChangeText}
          style={style}
          isSuccess={isSuccess}
          hasError={hasError}
          hasValidationError={hasValidationError}
          subText={subText}
          passwordStrength={passwordStrength}
          showStrengthBar={showStrengthBar}
          agreeMode={agreeMode}
          onSubmitEditing={onSubmitEditing}
          testID={testID}
          placeholder={config.placeholder}
          icon={config.icon}
          onIconPress={config.onPress}
        />
      );
  }
};

export default Input;