import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '@screens/Client/Home/HomeScreen';

export type ClientStackParamList = {
  Home: undefined;
  Bookings: { court?: string };
  BookingSuccess: undefined;
  MyBookings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<ClientStackParamList>();

interface ClientNavigatorProps {
  onLogout: () => void;
}

export const ClientNavigator: React.FC<ClientNavigatorProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      console.log('Calling onLogout from ClientNavigator');
      onLogout();
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