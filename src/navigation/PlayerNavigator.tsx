import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '@screens/player/Home/HomeScreen';

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
      

    </Stack.Navigator>
  );
};