import { useState, useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatPhoneForDisplay, registerUser } from '@utils';
import { usePasswordStrength } from '@hooks/general/usePasswordStrength';
import { RootStackParamList } from '@navigation/AuthNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenParams {
  phone: string;
}

interface UseRegisterLogicReturn {
  password: string;
  confirmPassword: string;
  passwordStrength: number;
  formattedPhone: string;
  handlePasswordChange: (text: string) => void;
  handleConfirmPasswordChange: (text: string) => void;
  handleRegister: () => void;
  isRegisterDisabled: boolean;
}

export const useRegisterLogic = ({
  route,
  navigation,
  onVerificationSuccess,
}: {
  route?: { params?: RegisterScreenParams };
  navigation: NavigationProp;
  onVerificationSuccess?: (role: string) => void;
}): UseRegisterLogicReturn => {
  const phone = route?.params?.phone ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const formattedPhone = formatPhoneForDisplay(phone);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    const strength = usePasswordStrength(text);
    setPasswordStrength(strength);
  }, []);

  const handleConfirmPasswordChange = useCallback((text: string) => {
    setConfirmPassword(text);
  }, []);

  const handleRegister = useCallback(() => {
    console.log('handleRegister called with:', { phone, password, confirmPassword });
    if (phone && password === confirmPassword) {
      console.log('Registering user...');
      registerUser(phone, password);
      console.log('Calling onVerificationSuccess with role: Client');
      onVerificationSuccess?.('Client');
    } else {
      console.log('Registration failed: phone or password mismatch', { phone, password, confirmPassword });
    }
  }, [password, confirmPassword, phone, onVerificationSuccess]);

  const isRegisterDisabled = password === '' || password !== confirmPassword;

  return {
    password,
    confirmPassword,
    passwordStrength,
    formattedPhone,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleRegister,
    isRegisterDisabled,
  };
};