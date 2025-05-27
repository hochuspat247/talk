import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/Client/Home';

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
    </Stack.Navigator>
  );
};