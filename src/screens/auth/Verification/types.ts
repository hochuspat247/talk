import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navigation/AuthNavigator';

export type VerificationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Verification'>;
  route: {
    params: VerificationScreenParams;
  };
  onVerificationSuccess?: (role: string) => void;
};

export interface VerificationScreenParams {
  phone: string;
  isRegistered: boolean;
}