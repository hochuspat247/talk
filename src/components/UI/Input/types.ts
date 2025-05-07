
import { StyleProp, ViewStyle, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  variant?: InputVariant;
  style?: StyleProp<ViewStyle>;
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
  | 'confirm'
  | 'email'; 