import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styled';
import { Colors } from '@constants/Colors';

interface HeaderProps {
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

const defaultAvatar = require('@assets/images/default-avatar.png');

/**
 * Компонент заголовка с логотипом, подзаголовком, иконками уведомлений, поиска и аватара.
 * @param props - Пропсы компонента.
 */
const Header: React.FC<HeaderProps> = ({
  title = 'TALLC',
  subtitle = 'Привет, Мастер ☀️',
  showNotification = true,
  showSearch = true,
  showAvatar = true,
  avatarUri,
  hasNotification = false,
  onNotificationPress,
  onSearchPress,
  onAvatarPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Верхний блок: логотип и иконки */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconsContainer}>
          {showNotification && (
            <TouchableOpacity onPress={onNotificationPress} style={styles.iconWrapper}>
              <Ionicons name="notifications-outline" size={26} color={Colors.text} />
              {hasNotification && <View style={styles.notificationDot} />}
            </TouchableOpacity>
          )}
          {showSearch && (
            <TouchableOpacity onPress={onSearchPress} style={styles.iconWrapper}>
              <Ionicons name="search-outline" size={26} color={Colors.text} />
            </TouchableOpacity>
          )}
          {showAvatar && (
            <TouchableOpacity onPress={onAvatarPress} style={styles.avatarContainer}>
              <Image
                source={avatarUri ? { uri: avatarUri } : defaultAvatar}
                style={styles.avatar}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Нижний блок: подзаголовок */}
      {subtitle && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;