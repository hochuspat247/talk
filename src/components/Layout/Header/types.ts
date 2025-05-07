import { StyleProp, ViewStyle } from 'react-native';

export interface HeaderProps {
  
  title?: string;

  
  subtitle?: string;

  
  showNotification?: boolean;

  
  showSearch?: boolean;

  
  showAvatar?: boolean;

  
  avatarUri?: string;

  
  hasNotification?: boolean;

  
  onNotificationPress?: () => void;

  
  onSearchPress?: () => void;

  
  onAvatarPress?: () => void;

  
  style?: StyleProp<ViewStyle>;
}