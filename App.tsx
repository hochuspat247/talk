// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { PlayerNavigator } from '@navigation/PlayerNavigator';
import { AdminNavigator } from '@navigation/AdminNavigator';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
  const [userRole, setUserRole] = useState<'player' | 'admin'>('player'); // Роль пользователя

  // Функция для обработки успешной верификации
  const handleVerificationSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            userRole === 'player' ? (
              <Stack.Screen name="Player">
                {() => <PlayerNavigator />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Admin">
                {() => <AdminNavigator />}
              </Stack.Screen>
            )
          ) : (
            <Stack.Screen name="Auth">
              {() => <AuthNavigator onVerificationSuccess={handleVerificationSuccess} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;