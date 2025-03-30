import 'react-native-gesture-handler';
import 'react-native-screens'; 
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { PlayerNavigator } from '@navigation/PlayerNavigator';
import { BookingProvider } from './src/context/BookingContext';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleVerificationSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaProvider>
      <BookingProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false // Отключаем анимации
            }}
          >
            {isAuthenticated ? (
              <Stack.Screen name="Player">
                {() => <PlayerNavigator onLogout={handleLogout} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Auth">
                {() => <AuthNavigator onVerificationSuccess={handleVerificationSuccess} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </BookingProvider>
    </SafeAreaProvider>
  );
};

export default App;