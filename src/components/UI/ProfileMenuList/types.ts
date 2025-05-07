import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';

export type NavigationProp = NativeStackNavigationProp<ClientStackParamList>;

export interface MenuItem {
  icon: string;
  label: string;
  screen: keyof ClientStackParamList;
}

export interface ProfileMenuListProps {
  
  onLogout: () => void;
}