import { StyleProp, ViewStyle } from 'react-native';

export interface HeaderProps {
  /** Заголовок (по умолчанию "TALLC"). */
  title?: string;

  /** Подзаголовок (по умолчанию "Привет, Мастер ☀️"). */
  subtitle?: string;

  /** Показывать ли иконку уведомлений (по умолчанию true). */
  showNotification?: boolean;

  /** Показывать ли иконку поиска (по умолчанию true). */
  showSearch?: boolean;

  /** Показывать ли аватар (по умолчанию true). */
  showAvatar?: boolean;

  /** URI аватара пользователя (опционально). */
  avatarUri?: string;

  /** Есть ли непрочитанные уведомления (по умолчанию false). */
  hasNotification?: boolean;

  /** Обработчик нажатия на иконку уведомлений (опционально). */
  onNotificationPress?: () => void;

  /** Обработчик нажатия на иконку поиска (опционально). */
  onSearchPress?: () => void;

  /** Обработчик нажатия на аватар (опционально). */
  onAvatarPress?: () => void;

  /** Дополнительные стили контейнера (опционально). */
  style?: StyleProp<ViewStyle>;
}