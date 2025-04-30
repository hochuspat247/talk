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
  | 'phone'; // Новый вариант для номера телефона

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  variant?: InputVariant;
  style?: object;
  isSuccess?: boolean;
  hasError?: boolean;
  hasValidationError?: boolean;
  subText?: string;
  passwordStrength?: number;
  showStrengthBar?: boolean;
  agreeMode?: boolean;
}