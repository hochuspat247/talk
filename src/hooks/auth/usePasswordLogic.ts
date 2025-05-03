import { useState, useCallback } from 'react';
import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/AuthNavigator';
import { useTextInput, usePhoneFormatter, usePasswordStrength } from '@hooks';

const CORRECT_PASSWORD = '4444';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Password'>;

interface UsePasswordLogicParams {
  route: RouteProp<RootStackParamList, 'Password'>;
  navigation?: NavigationProp;
  onVerificationSuccess?: (role?: string) => void;
}

interface UsePasswordLogicReturn {
  phone: string;
  password: string;
  setPassword: (text: string) => void;
  hasError: boolean;
  passwordStrength: number;
  handlePasswordSubmit: () => void;
}

/**
 * Хук для управления логикой экрана ввода пароля.
 * @param params - Параметры хука, включая route и onVerificationSuccess.
 * @returns Объект с состоянием и обработчиками.
 */
export const usePasswordLogic = ({
  route,
  navigation,
  onVerificationSuccess,
}: UsePasswordLogicParams): UsePasswordLogicReturn => {
  const { phone } = route.params;

  const { value: password, setValue: setPassword } = useTextInput({
    onChange: (text: string) => {
      const strength = usePasswordStrength(text);
      setPasswordStrength(strength);
    },
  });

  const [hasError, setHasError] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const formattedPhone = usePhoneFormatter(phone);

  const handlePasswordSubmit = useCallback(() => {
    if (password === CORRECT_PASSWORD) { // Убираем проверку passwordStrength
      setHasError(false);
      navigation?.navigate('Home');
      setTimeout(() => {
        onVerificationSuccess?.('user');
      }, 1000);
    } else {
      setHasError(true);
    }
  }, [password, navigation, onVerificationSuccess]);

  return {
    phone: formattedPhone,
    password,
    setPassword,
    hasError,
    passwordStrength,
    handlePasswordSubmit,
  };
};