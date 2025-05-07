import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';

export type NavigationProp = NativeStackNavigationProp<ClientStackParamList>;

export interface ProfileHeaderProps {
  
  name: string;
  
  rating: number;
  
  phoneNumber: string;
  
  avatarUrl?: string;
}