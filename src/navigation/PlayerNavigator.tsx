// src/navigation/PlayerNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/player/Home/HomeScreen';
import BookingsScreen from '@screens/player/BookingsScreen';
import ProfileScreen from '@screens/player/ProfileScreen';

const Stack = createStackNavigator();

export const PlayerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Bookings" component={BookingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};