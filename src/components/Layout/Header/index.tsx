import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './styled';
import { HeaderProps } from './types';
import { DEFAULT_AVATAR } from './constants';
import { Colors } from '@constants/Colors';







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
      {}
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
                source={avatarUri ? { uri: avatarUri } : DEFAULT_AVATAR}
                style={styles.avatar}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {}
      {subtitle && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;