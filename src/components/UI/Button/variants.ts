
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from './styled';

interface VariantConfig {
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  iconColor: string;
}

export const VARIANT_CONFIG: Record<string, VariantConfig> = {
  primary: {
    buttonStyle: styles.primary,
    textStyle: styles.buttonText,
    iconColor: Colors.white,
  },
  secondary: {
    buttonStyle: styles.secondary,
    textStyle: styles.buttonText,
    iconColor: Colors.white,
  },
  text: {
    buttonStyle: styles.text,
    textStyle: styles.textButtonText,
    iconColor: Colors.text,
  },
  accent: {
    buttonStyle: styles.accent,
    textStyle: styles.buttonText,
    iconColor: Colors.white,
  },
  icon: {
    buttonStyle: styles.iconNoFill,
    textStyle: styles.iconButtonText,
    iconColor: Colors.white,
  },
  'with-icon-right': {
    buttonStyle: styles.primary,
    textStyle: styles.buttonText,
    iconColor: Colors.white,
  },
};

export const DISABLED_CONFIG: VariantConfig = {
  buttonStyle: styles.disabled,
  textStyle: styles.buttonText,
  iconColor: Colors.disabled,
};

export const BLOCKED_CONFIG: VariantConfig = {
  buttonStyle: styles.blocked,
  textStyle: styles.blockedText,
  iconColor: Colors.disabled, 
};