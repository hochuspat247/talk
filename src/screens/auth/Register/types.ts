import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navigation/AuthNavigator';

export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export interface RegisterScreenParams {
  phone: string;
}