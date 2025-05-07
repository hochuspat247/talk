import { NavigationProp } from './types';





export const handleLogout = (navigation: NavigationProp): void => {
  navigation.getParent()?.goBack(); 
};