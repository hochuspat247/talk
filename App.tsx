// App.tsx
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { PlayerNavigator } from '@navigation/PlayerNavigator';
import { AdminNavigator } from '@navigation/AdminNavigator';
import { setupAuth } from './src/api/client';
import * as Font from 'expo-font';

export type RootNavigatorParamList = {
  Auth: undefined;
  Player: undefined;
  Admin: undefined;
};

const Stack = createStackNavigator<RootNavigatorParamList>();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Загрузка шрифтов и проверка аутентификации
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Загрузка шрифтов
        console.log('Загрузка шрифтов...');
        const fonts = {
          'Manrope-Regular': require('@assets/fonts/Manrope-Regular.ttf'),
          'NEXTART_Bold': require('@assets/fonts/NEXTART_Bold.ttf'),
          'Manrope-Bold': require('@assets/fonts/Manrope-Bold.ttf'),
          'Manrope-ExtraBold': require('@assets/fonts/Manrope-ExtraBold.ttf'),
          'Manrope-Medium': require('@assets/fonts/Manrope-Medium.ttf'),
          'Manrope-SemiBold': require('@assets/fonts/Manrope-SemiBold.ttf'),
        };

        await Font.loadAsync(fonts);
        console.log('Шрифты загружены успешно');
        setFontsLoaded(true);
      } catch (error) {
        console.error('Ошибка загрузки шрифтов:', error);
        setFontsLoaded(true); // Продолжаем, даже если шрифты не загрузились
      }

      // Проверка аутентификации
      try {
        console.log('Checking authentication...');
        const token = await setupAuth();
        console.log('setupAuth result - token:', token);

        if (token) {
          const role = await AsyncStorage.getItem('role');
          console.log('Role from AsyncStorage:', role);
          setIsAuthenticated(true);
          setIsAdmin(role === 'admin');
        } else {
          console.log('No valid token, user not authenticated');
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleVerificationSuccess = async (role?: string) => {
    if (role) {
      await AsyncStorage.setItem('role', role);
      setIsAuthenticated(true);
      setIsAdmin(role === 'admin');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  if (isLoading || !fontsLoaded) {
    return null; // Или <LoadingScreen />
  }

  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
            {isAuthenticated ? (
              isAdmin ? (
                <Stack.Screen name="Admin">
                  {(props) => <AdminNavigator {...props} onLogout={handleLogout} />}
                </Stack.Screen>
              ) : (
                <Stack.Screen name="Player">
                  {(props) => <PlayerNavigator {...props} onLogout={handleLogout} />}
                </Stack.Screen>
              )
            ) : (
              <Stack.Screen name="Auth">
                {(props) => <AuthNavigator {...props} onVerificationSuccess={handleVerificationSuccess} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
     
    </SafeAreaProvider>
  );
};

export default App;