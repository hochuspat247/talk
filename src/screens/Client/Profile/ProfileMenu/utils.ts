import { NavigationProp } from './types';

export const navigateToScreen = (screen: string, navigation: NavigationProp) => {
  console.log('[ProfileMenuUtils] Navigating to:', screen);
  navigation.navigate(screen);
};

export const handleLogout = async (navigation: NavigationProp, onLogout: () => Promise<void>): Promise<void> => {
  console.log('[ProfileMenuUtils] Handling logout');
  try {
    await onLogout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } catch (error) {
    console.error('[ProfileMenuUtils] Logout error:', error);
  }
};