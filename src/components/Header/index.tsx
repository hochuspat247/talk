import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styled';

interface HeaderProps {
  userName: string; // Имя пользователя
  avatarUri?: string; // URL аватара (опционально)
}

const Header: React.FC<HeaderProps> = ({ userName, avatarUri }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Доброе утро, {userName}!</Text>
        <Text style={styles.subtitle}>Готовы к игре? 🎾</Text>
      </View>
      <Image
        source={avatarUri ? { uri: avatarUri } : require('../../../assets/images/default-avatar.png')} // Заглушка для аватара
        style={styles.avatar}
      />
    </View>
  );
};

export default Header;