import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/admin/Home/HomeScreen';
import BookingsScreen from '@screens/admin/Bookings/BookingsScreen';
import ProfileScreen from '@screens/admin/Profile/ProfileScreen';
import SelectUserScreen from '@screens/admin/SelectUser/SelectUserScreen';
import FilterScreen from '@screens/admin/Filter/FilterScreen';
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