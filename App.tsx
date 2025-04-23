import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { PlayerNavigator } from '@navigation/PlayerNavigator';
import { AdminNavigator } from '@navigation/AdminNavigator';
import { BookingProvider } from './src/context/BookingContext';
import { setupAuth } from './src/api/client';

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

  useEffect(() => {
    const checkAuth = async () => {
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

    checkAuth();
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

  if (isLoading) {
    return null; // Или <LoadingScreen />
  }

  return (
    <SafeAreaProvider>
      <BookingProvider>
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
      </BookingProvider>
    </SafeAreaProvider>
  );
};

export default App;