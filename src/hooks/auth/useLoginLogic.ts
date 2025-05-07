import { useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTextInput, useNavigationHandler } from '@hooks';
import { RootStackParamList } from '@navigation/AuthNavigator';
import { isPhoneNumberRegistered } from '@utils';
import { PHONE_LENGTH_REQUIRED } from '@constants/phone';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface UseLoginLogicParams {
  navigation: NavigationProp;
}

interface UseLoginLogicReturn {
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  isPhoneNumberComplete: boolean;
  isKeyboardVisible: boolean;
  handleContinue: () => void;
}






export const useLoginLogic = ({ navigation }: UseLoginLogicParams): UseLoginLogicReturn => {
  const { value: phoneNumber, setValue: setPhoneNumber, isValid: isPhoneNumberComplete, isKeyboardVisible } =
    useTextInput({
      validate: (value: string) => value.length === PHONE_LENGTH_REQUIRED,
    });

  const isRegistered = useCallback(() => {
    return isPhoneNumberRegistered(phoneNumber);
  }, [phoneNumber]);

  const handleContinue = useNavigationHandler({
    navigation,
    routeName: 'Verification',
    params: {
      phone: phoneNumber,
      userId: 1,
      isRegistered: isRegistered(),
    },
    condition: isPhoneNumberComplete,
  });

  return {
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberComplete,
    isKeyboardVisible,
    handleContinue,
  };
};