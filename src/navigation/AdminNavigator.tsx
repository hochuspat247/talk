import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/admin/Home/HomeScreen';
import BookingsScreen from '@screens/admin/Bookings/BookingsScreen';
import ProfileScreen from '@screens/admin/Profile/ProfileScreen';
import BookingSuccessScreen from '@screens/admin/BookingSuccess/BookingSuccessScreen';
import MyBookingsScreen from '@screens/admin/MyBookings/MyBookingsScreen';
import SelectUserScreen from '@screens/admin/SelectUser/SelectUserScreen';
import FilterScreen from '@screens/admin/Filter/FilterScreen'; // Добавляем новый экран
import ProfileOptionsScreen from '@screens/admin/ProfileOptions/ProfileOptionsScreen';
import RegisterScreen from '@screens/auth/Register/RegisterScreen';
import AccountCreatedScreen from '@screens/admin/AccountCreated/AccountCreatedScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

interface AdminNavigatorProps {
  onLogout: () => void;
}

export const AdminNavigator: React.FC<AdminNavigatorProps> = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectUser"
        component={SelectUserScreen}
        options={{ headerTitle: 'Выбор пользователя' }}
      />
      <Stack.Screen
        name="Bookings"
        component={BookingsScreen}
        options={({ route }) => ({
          headerTitle: route.params?.court || 'Бронирование корта',
        })}
      />
      <Stack.Screen
        name="BookingSuccess"
        component={BookingSuccessScreen}
        options={{ headerTitle: 'Бронирование корта' }}
      />
      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={({ navigation }) => ({
          headerTitle: 'Бронирования',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() =>
                navigation.navigate('FilterScreen', {
                  onApplyFilters: (filters) => {
                    // Здесь можно обработать применённые фильтры
                    console.log('Применённые фильтры:', filters);
                  },
                })
              }
            >
              <Ionicons name="funnel-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerTitle: 'Фильтр' }}
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
            <Stack.Screen
        name="ProfileOptions"
        component={ProfileOptionsScreen}
        options={{ headerTitle: 'Профиль' }}
      />
          <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="AccountCreated"
        component={AccountCreatedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};