import { ClientStackParamList } from '@navigation/ClientNavigator';
import { NavigationProp } from './types';






export const navigateToScreen = (
  screen: keyof ClientStackParamList,
  navigation: NavigationProp
): void => {
  navigation.navigate(screen);
};





export const handleLogout = (onLogout: () => void): void => {
  onLogout();
};