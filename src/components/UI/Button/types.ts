
import { StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'accent' | 'icon' | 'with-icon-right';
export type ButtonSize = 'small' | 'large';

export interface ButtonProps {
  
  title: string;
  
  onPress: () => void;
  
  disabled?: boolean;
  
  block?: boolean;
  
  variant?: ButtonVariant;
  
  style?: StyleProp<ViewStyle>;
  
  showIcon?: boolean;
  
  iconName?: keyof typeof Ionicons.glyphMap; 
  
  size?: ButtonSize;
}