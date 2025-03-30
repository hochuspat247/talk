import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/player/Home/HomeScreen';
import BookingsScreen from '@screens/player/Bookings/BookingsScreen';
import ProfileScreen from '@screens/player/Profile/ProfileScreen';
import BookingSuccessScreen from '@screens/player/BookingSuccess/BookingSuccessScreen';
import MyBookingsScreen from '@screens/player/MyBookings/MyBookingsScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

interface PlayerNavigatorProps {
  onLogout: () => void; // Проп для функции выхода
}

export const PlayerNavigator: React.FC<PlayerNavigatorProps> = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Скрываем шапку для Home
      />
      <Stack.Screen
        name="Bookings"
        component={BookingsScreen}
        options={({ route }) => ({
          headerTitle: route.params?.court || 'Бронирование корта', // Динамический заголовок
        })}
      />
      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccessScreen}
        options={{ headerTitle: 'Бронирование корта' }} // Устанавливаем заголовок
      />
      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ headerTitle: 'Мои бронирования' }} // Устанавливаем заголовок
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Профиль',
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 15 }}>
              <Ionicons name="log-out-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};