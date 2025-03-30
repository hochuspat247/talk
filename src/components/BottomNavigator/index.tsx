import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';

interface BottomNavigatorProps {
  activeTab: 'Home' | 'MyBookings' | 'Profile'; // Определяем активную вкладку
}

const BottomNavigator: React.FC<BottomNavigatorProps> = ({ activeTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tab: 'Home' | 'MyBookings' | 'Profile') => {
    if (tab === 'Home') {
      navigation.navigate('Home'); // Переход на экран "Главная"
    } else if (tab === 'MyBookings') {
      navigation.navigate('MyBookings'); // Переход на экран "Мои брони"
    } else if (tab === 'Profile') {
      navigation.navigate('Profile'); // Переход на экран "Профиль"
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Home')}>
        <Ionicons
          name="home-outline"
          size={24}
          color={activeTab === 'Home' ? '#007AFF' : '#000'} // Синий цвет для активной вкладки
        />
        <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>Главная</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('MyBookings')}>
        <Ionicons
          name="calendar-outline"
          size={24}
          color={activeTab === 'MyBookings' ? '#007AFF' : '#000'}
        />
        <Text style={[styles.tabText, activeTab === 'MyBookings' && styles.activeTabText]}>Мои брони</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Profile')}>
        <Ionicons
          name="person-outline"
          size={24}
          color={activeTab === 'Profile' ? '#007AFF' : '#000'}
        />
        <Text style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText]}>Профиль</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigator;