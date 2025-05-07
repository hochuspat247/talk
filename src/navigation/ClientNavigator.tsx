import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '@screens/Client/Home/HomeScreen';
import ProfileMenu from '@screens/Client/Profile/ProfileMenu';
import ProfileSettingsScreen from '@screens/Client/Profile/ProfileSettings';
import { View,Text } from 'react-native';

export type ClientStackParamList = {
  Home: undefined;
  Bookings: { court?: string };
  BookingSuccess: undefined;
  MyBookings: undefined;
  Profile: undefined;
  WorkSchedule: undefined;
  Services: undefined;
  BankDetails: undefined;
  ProfileSettings: undefined;
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

  const PlaceholderScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Экран в разработке</Text>
    </View>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileMenu}
        initialParams={{ onLogout: handleLogout }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkSchedule"
        component={PlaceholderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={PlaceholderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BankDetails"
        component={PlaceholderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{ headerTitle: 'Настройки' }}
      />
    </Stack.Navigator>
  );
};