export type TabName = 'Home' | 'Friends' | 'Wallet' | 'Profile'; 

export interface TabConfig {
  name: TabName;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}