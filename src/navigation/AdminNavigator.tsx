import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/admin/Home/HomeScreen';
import ProfileOptionsScreen from '@screens/admin/ProfileOptions/ProfileOptionsScreen';
import RegisterScreen from '@screens/auth/Register/RegisterScreen';

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
    
    </Stack.Navigator>
  );
};