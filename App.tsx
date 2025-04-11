import 'react-native-gesture-handler';
import 'react-native-screens';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { PlayerNavigator } from '@navigation/PlayerNavigator';
import { AdminNavigator } from '@navigation/AdminNavigator';
import { BookingProvider } from './src/context/BookingContext';

// Определяем типы для корневого навигатора
export type RootNavigatorParamList = {
  Auth: undefined;
  Player: undefined;
  Admin: undefined;
};

const Stack = createStackNavigator<RootNavigatorParamList>();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        if (token) {
          setIsAuthenticated(true);
          setIsAdmin(role === 'admin');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    checkAuth();
  }, []);

  const handleVerificationSuccess = async (role?: string) => {
    if (role) {
      try {
        await AsyncStorage.setItem('role', role);
        console.log('Role saved to AsyncStorage:', role);
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
      } catch (error) {
        console.error('Error saving role to AsyncStorage:', error);
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <BookingProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}
          >
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
      </BookingProvider>
    </SafeAreaProvider>
  );
};

export default App;