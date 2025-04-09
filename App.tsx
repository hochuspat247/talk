import 'react-native-gesture-handler';
import 'react-native-screens';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { PlayerNavigator } from '@navigation/PlayerNavigator';
import { AdminNavigator } from '@navigation/AdminNavigator'; // Добавляем импорт
import { BookingProvider } from './src/context/BookingContext';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Состояние для проверки, админ ли пользователь

  const handleVerificationSuccess = (role?: string) => {
    setIsAuthenticated(true);
    if (role === 'admin') {
      setIsAdmin(true); // Устанавливаем роль администратора
    } else {
      setIsAdmin(false); // Обычный пользователь
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false); // Сбрасываем роль при выходе
  };

  return (
    <SafeAreaProvider>
      <BookingProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false, // Отключаем анимации
            }}
          >
            {isAuthenticated ? (
              isAdmin ? (
                <Stack.Screen name="Admin">
                  {() => <AdminNavigator onLogout={handleLogout} />}
                </Stack.Screen>
              ) : (
                <Stack.Screen name="Player">
                  {() => <PlayerNavigator onLogout={handleLogout} />}
                </Stack.Screen>
              )
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