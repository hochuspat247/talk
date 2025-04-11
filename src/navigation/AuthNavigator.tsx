import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '@screens/WelcomeScreen';
import LoginScreen from '@screens/auth/Login/LoginScreen';
import RegisterScreen from '@screens/auth/Register/RegisterScreen';
import VerificationScreen from '@screens/auth/Verification/VerificationScreen';
import AccountCreatedScreen from '@screens/admin/AccountCreated/AccountCreatedScreen';

// Определяем типы для параметров навигации
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: { isAdmin?: boolean }; // Добавляем параметр isAdmin
  Verification: { phone: string; userId: number }; // Параметры для VerificationScreen
  AccountCreated: undefined;
  AdminNavigator: undefined; // Навигатор для администратора
  PlayerNavigator: undefined; // Навигатор для игрока
};

const Stack = createStackNavigator<RootStackParamList>();

interface AuthNavigatorProps {
  onVerificationSuccess: (role?: string) => void; // Проп для обработки успешной верификации
}

export const AuthNavigator = ({ onVerificationSuccess }: AuthNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Verification" options={{ headerShown: false }}>
        {(props) => <VerificationScreen {...props} onVerificationSuccess={onVerificationSuccess} />}
      </Stack.Screen>
      <Stack.Screen
        name="AccountCreated"
        component={AccountCreatedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};