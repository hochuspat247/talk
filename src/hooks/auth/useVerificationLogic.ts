import { useState, useEffect, useCallback } from 'react';
import { formatPhoneForDisplay } from '@utils/formatters/phoneFormatter';
import { useTimer } from '@hooks/general/useTimer';
import { VerificationScreenParams } from '@screens/auth/Verification/types';
import { RootStackParamList } from '@navigation/AuthNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Verification'>;

const VERIFICATION_CODE = '4444';
const INITIAL_TIMER = 30;







export const useVerificationLogic = ({
  navigation,
  phone,
  isRegistered,
}: {
  navigation: NavigationProp;
  onVerificationSuccess?: (role: string) => void;
} & VerificationScreenParams) => {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const { timer, resetTimer } = useTimer(INITIAL_TIMER);
  const formattedPhone = formatPhoneForDisplay(phone);

  useEffect(() => {
    if (code.length === 4) {
      if (code === VERIFICATION_CODE) {
        setHasError(false);
        if (isRegistered) {
          navigation.navigate('Password', { phone });
        } else {
          navigation.navigate('Register', { phone });
        }
      } else {
        setHasError(true);
      }
    } else {
      setHasError(false);
    }
  }, [code, navigation, phone, isRegistered]);

  const handleCodeChange = useCallback((text: string) => {
    setCode(text);
  }, []);

  const handleResendCode = useCallback(() => {
    if (timer === 0) {
      resetTimer();
      setCode('');
      setHasError(false);
    }
  }, [timer, resetTimer]);

  return {
    code,
    timer,
    hasError,
    formattedPhone,
    handleCodeChange,
    handleResendCode,
  };
};