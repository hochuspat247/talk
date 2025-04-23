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

  // Функция загрузки профиля пользователя
  const fetchUserProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('Retrieved userId from AsyncStorage:', userId);
      if (userId) {
        const user: User = await getProfile(parseInt(userId));
        console.log('User profile fetched:', {
          first_name: user.first_name,
          photo: user.photo,
        });
        setUserName(user.first_name || defaultUserName || 'Гость');
        setAvatarUri(user.photo || defaultAvatarUri);
      } else {
        throw new Error('User ID not found in AsyncStorage');
      }
    } catch (error: any) {
      console.error('Error fetching user profile in Header:', error);
      // Не показываем Alert при периодическом обновлении, чтобы не беспокоить пользователя
      setUserName(defaultUserName || 'Гость');
      setAvatarUri(defaultAvatarUri);
    }
  };

  useEffect(() => {
    // Устанавливаем приветствие
    setGreeting(generateGreeting());

    // Начальная загрузка профиля
    fetchUserProfile();

    // Периодическое обновление профиля каждые 30 секунд
    const intervalId = setInterval(() => {
      console.log('Periodically refreshing user profile...');
      fetchUserProfile();
    }, 30000); // 30 секунд

    // Очистка интервала при размонтировании
    return () => {
      console.log('Clearing profile refresh interval');
      clearInterval(intervalId);
    };
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