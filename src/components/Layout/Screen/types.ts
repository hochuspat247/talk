import { StyleProp, ViewStyle } from 'react-native';

export interface ScreenProps {
  
  children: React.ReactNode;

  
  style?: StyleProp<ViewStyle>;

  
  contentContainerStyle?: StyleProp<ViewStyle>;
}