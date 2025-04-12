import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styled';
import { getProfile } from '@api/profile';
import { User } from '@api/types';

interface HeaderProps {
  userName?: string;
  avatarUri?: string;
}

const Header: React.FC<HeaderProps> = ({ userName: defaultUserName, avatarUri: defaultAvatarUri }) => {
  const [userName, setUserName] = useState<string>(defaultUserName || 'Гость');
  const [avatarUri, setAvatarUri] = useState<string | undefined>(defaultAvatarUri);
  const [greeting, setGreeting] = useState<string>('Доброе утро');

  // Генерация приветствия в зависимости от времени
  const generateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Доброе утро';
    if (hour >= 12 && hour < 17) return 'Доброго дня';
    if (hour >= 17 && hour < 23) return 'Добрый вечер';
    return 'Доброй ночи';
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const user: User = await getProfile(parseInt(userId));
          setUserName(user.first_name);
          setAvatarUri(user.photo || undefined);
        } else {
          throw new Error('User ID not found in AsyncStorage');
        }
      } catch (error: any) {
        console.error('Error fetching user profile in Header:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные пользователя');
        setUserName(defaultUserName || 'Гость');
        setAvatarUri(defaultAvatarUri);
      }
    };

    setGreeting(generateGreeting());
    fetchUserProfile();
  }, [defaultUserName, defaultAvatarUri]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{greeting}, {userName}!</Text>
        <Text style={styles.subtitle}>Готовы к игре? 🎾</Text>
      </View>
      <Image
        source={avatarUri ? { uri: avatarUri } : require('../../../assets/images/default-avatar.png')}
        style={styles.avatar}
      />
    </View>
  );
};

export default Header;
