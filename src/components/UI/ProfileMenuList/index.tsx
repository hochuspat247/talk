import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ProfileMenuListProps, NavigationProp } from './types';
import { styles } from './styled';
import { MENU_ITEMS, SIZES, COLORS } from './constants';
import { navigateToScreen, handleLogout } from './utils';








const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ onLogout }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigateToScreen(item.screen, navigation)}
            accessibilityLabel={`Перейти к ${item.label}`}
          >
            <Ionicons
              name={item.icon}
              size={SIZES.ICON}
              color={COLORS.ICON}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>{item.label}</Text>
            <Ionicons
              name="chevron-forward"
              size={SIZES.ARROW_ICON}
              color={COLORS.ARROW}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout(onLogout)}
          accessibilityLabel="Выйти из профиля"
        >
          <Ionicons
            name="log-out-outline"
            size={SIZES.ICON}
            color={COLORS.LOGOUT_ICON}
            style={styles.menuIcon}
          />
          <Text style={styles.logoutText}>Выйти из профиля</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileMenuList;