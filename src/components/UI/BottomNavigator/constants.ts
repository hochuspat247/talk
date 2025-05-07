import { TabConfig } from './types';

export const TABS: TabConfig[] = [
  { name: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline' },
  { name: 'Friends', activeIcon: 'people', inactiveIcon: 'people-outline' },
  { name: 'Wallet', activeIcon: 'wallet', inactiveIcon: 'wallet-outline' },
  { name: 'Settings', activeIcon: 'settings', inactiveIcon: 'settings-outline' },
];

export const ACTIVE_TAB_COLOR = '#F090F1';
export const INACTIVE_TAB_COLOR = '#000';
export const ICON_SIZE = 24;