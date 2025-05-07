import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { ClientNavigator } from '@navigation/ClientNavigator';
import { MasterNavigator } from '@navigation/MasterNavigator';
import { setupAuth } from './src/api/client';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';

export type RootNavigatorParamList = {
  Auth: undefined;
  Client: undefined;
  Master: undefined;
};

const Stack = createStackNavigator<RootNavigatorParamList>();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Загрузка шрифтов...');
        const fonts = {
          'Manrope-Regular': require('@assets/fonts/Manrope-Regular.ttf'),
          'NEXTART_Bold': require('@assets/fonts/NEXTART_Bold.otf'),
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
        setFontsLoaded(true);
      }

      try {
        console.log('Checking authentication...');
        const token = await setupAuth();
        console.log('setupAuth result - token:', token);

        if (token) {
          const role = await AsyncStorage.getItem('role');
          console.log('Role from AsyncStorage:', role);
          setIsAuthenticated(true);
          setIsMaster(role === 'Master');
        } else {
          console.log('No valid token, user not authenticated');
          setIsAuthenticated(false);
          setIsMaster(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
        setIsMaster(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    console.log('App state:', { isAuthenticated, isMaster });
  }, [isAuthenticated, isMaster]);

  const handleVerificationSuccess = async (role?: string) => {
    console.log('handleVerificationSuccess called with role:', role);
    if (role) {
      await AsyncStorage.setItem('role', role);
      console.log('Role saved to AsyncStorage:', await AsyncStorage.getItem('role'));
      setIsAuthenticated(true);
      setIsMaster(role === 'Master');
      console.log('New state after handleVerificationSuccess:', { isAuthenticated: true, isMaster: role === 'Master' });
    } else {
      console.log('Role is undefined, cannot proceed with verification success');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('userId');
    setIsAuthenticated(false);
    setIsMaster(false);
  };

  if (isLoading || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            key={`${isAuthenticated}-${isMaster}`}
            screenOptions={{ headerShown: false, animationEnabled: false }}
          >
            {isAuthenticated ? (
              isMaster ? (
                <Stack.Screen name="Master">
                  {(props) => <MasterNavigator {...props} onLogout={handleLogout} />}
                </Stack.Screen>
              ) : (
                <Stack.Screen name="Client">
                  {(props) => <ClientNavigator {...props} onLogout={handleLogout} />}
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
    </GestureHandlerRootView>
  );
};

export default App;