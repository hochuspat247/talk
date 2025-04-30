import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '@screens/player/Home/HomeScreen';
import ProfileScreen from '@screens/player/Profile/ProfileScreen';

// Определяем типы для параметров навигации
export type PlayerStackParamList = {
  Home: undefined;
  Bookings: { court?: string }; // Параметр court для BookingsScreen
  BookingSuccess: undefined;
  MyBookings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<PlayerStackParamList>();

interface PlayerNavigatorProps {
  onLogout: () => void; // Проп для функции выхода
}

export const PlayerNavigator: React.FC<PlayerNavigatorProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Очищаем AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      onLogout(); // Вызываем onLogout для перенаправления на экран аутентификации
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Профиль',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
              <Ionicons name="log-out-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};