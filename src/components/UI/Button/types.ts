// src/components/Button/types.ts
import { StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'accent' | 'icon' | 'with-icon-right';
export type ButtonSize = 'small' | 'large';

export interface ButtonProps {
  /** Текст кнопки */
  title: string;
  /** Обработчик нажатия */
  onPress: () => void;
  /** Отключенное состояние */
  disabled?: boolean;
  /** Заблокированное состояние */
  block?: boolean;
  /** Вариант кнопки */
  variant?: ButtonVariant;
  /** Пользовательские стили контейнера */
  style?: StyleProp<ViewStyle>;
  /** Показывать иконку */
  showIcon?: boolean;
  /** Имя иконки из Ionicons */
  iconName?: keyof typeof Ionicons.glyphMap; // Используем keyof typeof Ionicons.glyphMap
  /** Размер кнопки */
  size?: ButtonSize;
}