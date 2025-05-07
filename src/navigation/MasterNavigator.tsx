import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/Master/Home/HomeScreen';
import ProfileOptionsScreen from '@screens/Master/ProfileOptions/ProfileOptionsScreen';

const Stack = createStackNavigator();

interface MasterNavigatorProps {
  onLogout: () => void;
}

export const MasterNavigator: React.FC<MasterNavigatorProps> = ({ onLogout }) => {
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
    </Stack.Navigator>
  );
};