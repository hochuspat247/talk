import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '@screens/WelcomeScreen';
import LoginScreen from '@screens/auth/Login/LoginScreen';
import RegisterScreen from '@screens/auth/Register/RegisterScreen';
import VerificationScreen from '@screens/auth/Verification/VerificationScreen';
import PasswordScreen from '@screens/auth/Password/PasswordScreen';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import { TEXTS } from '@constants/Texts';
import { PlayerNavigator } from '@navigation/PlayerNavigator'; // Импортируем PlayerNavigator

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: { phone: string };
  Verification: { phone: string; userId: number; isRegistered: boolean };
  Password: { phone: string };
  Home: undefined;
  AdminNavigator: undefined;
  PlayerNavigator: undefined; // Добавляем PlayerNavigator в типы
};

const Stack = createStackNavigator<RootStackParamList>();

interface AuthNavigatorProps {
  onVerificationSuccess: (role?: string) => void;
}

export const AuthNavigator = ({ onVerificationSuccess }: AuthNavigatorProps) => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: TEXTS.REGISTER_TITLE,
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontFamily: FONTS.MANROPE_SEMI_BOLD, fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="Verification"
        options={{
          title: TEXTS.VERIFICATION_TITLE,
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontFamily: FONTS.MANROPE_SEMI_BOLD, fontSize: 18 },
        }}
      >
        {(props) => <VerificationScreen {...props} onVerificationSuccess={onVerificationSuccess} />}
      </Stack.Screen>
      <Stack.Screen
        name="Password"
        options={{
          title: TEXTS.PASSWORD_TITLE,
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontFamily: FONTS.MANROPE_SEMI_BOLD, fontSize: 18 },
        }}
      >
        {(props) => <PasswordScreen {...props} onVerificationSuccess={onVerificationSuccess} />}
      </Stack.Screen>
      <Stack.Screen
        name="PlayerNavigator"
        component={PlayerNavigator}
        options={{ headerShown: false }}
        listeners={{
          // Сбрасываем стек навигации, чтобы пользователь не мог вернуться назад
          beforeRemove: (e) => {
            e.preventDefault(); // Предотвращаем возврат назад
          },
        }}
      />
    </Stack.Navigator>
  );
};