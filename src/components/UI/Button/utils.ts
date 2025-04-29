// src/components/Button/utils.ts
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from './styled';
import { ButtonVariant, ButtonSize } from './types';

export const getIconStyle = (variant: ButtonVariant, size: ButtonSize): StyleProp<ViewStyle> | undefined => {
  if (variant !== 'icon') return undefined;
  return size === 'small' ? styles.iconVariantSmall : styles.iconVariantFull;
};