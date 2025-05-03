// src/components/TransparentContainer/types.ts
import { StyleProp, ViewStyle } from 'react-native';

export interface TransparentContainerProps {
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Пользовательские стили контейнера */
  style?: StyleProp<ViewStyle>;
}