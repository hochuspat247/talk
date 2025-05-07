import { StyleProp, ViewStyle } from 'react-native';

export interface ScreenProps {
  /** Дочерние элементы для рендеринга внутри экрана. */
  children: React.ReactNode;

  /** Дополнительные стили для внешнего контейнера (опционально). */
  style?: StyleProp<ViewStyle>;

  /** Дополнительные стили для контейнера содержимого ScrollView (опционально). */
  contentContainerStyle?: StyleProp<ViewStyle>;
}