import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Friends: undefined;
  Wallet: undefined;
  Settings: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type TabName = 'Home' | 'Friends' | 'Wallet' | 'Settings';

export interface TabConfig {
  name: TabName;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

export interface BottomNavigatorProps {
  /** Активная вкладка. */
  activeTab: TabName;
}