import React from 'react';
import { View, Text } from 'react-native';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import { TEXTS } from '@constants/Texts';
import { useRegisterLogic } from '@hooks/auth/useRegisterLogic';
import { styles } from './styled';
import { RegisterScreenProps } from './types';

/**
 * Экран регистрации для создания нового пользователя.
 * Позволяет ввести пароль, подтвердить его и зарегистрироваться.
 * @param props - Пропсы экрана, включая навигацию и параметры маршрута.
 */
const RegisterScreen: React.FC<RegisterScreenProps> = ({ route, navigation, onVerificationSuccess }) => {
  const {
    password,
    confirmPassword,
    formattedPhone,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleRegister,
    isRegisterDisabled,
  } = useRegisterLogic({ route, navigation, onVerificationSuccess });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>{formattedPhone}</Text>
      </View>

      <View style={styles.content}>
        <Input
          value={password}
          onChangeText={handlePasswordChange}
          variant="password"
          secureTextEntry
          showStrengthBar
          style={styles.input}
        />
        <Input
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          variant="confirm"
          secureTextEntry
          confirmValue={password}
          style={styles.input}
          agreeMode
          subText={TEXTS.REGISTRATION_TERMS}
          onSubmitEditing={handleRegister}
        />
        <Button
          title={TEXTS.REGISTER_BUTTON}
          onPress={handleRegister}
          variant="primary"
          block={isRegisterDisabled} // Меняем disabled на block
        />
      </View>
    </View>
  );
};

export default RegisterScreen;