// src/screens/auth/Verification/VerificationScreen.tsx
import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '@components/Input';
import Button from '@components/Button';
import { styles } from './styled';

interface VerificationScreenProps {
  onVerificationSuccess: () => void; // Проп для обработки успешной верификации
}

const VerificationScreen = ({ onVerificationSuccess }: VerificationScreenProps) => {
  const navigation = useNavigation();
  const [code, setCode] = useState<string>(''); // Состояние для кода
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasError, setHasError] = useState(false); // Состояние для ошибки
  const [isSuccess, setIsSuccess] = useState(false); // Состояние для успешного ввода

  // Проверка валидности формы и успешного ввода
  useEffect(() => {
    const isValid = code.length === 4; // Код должен быть из 4 цифр
    setIsFormValid(isValid);

    // Проверяем, если код "4444", устанавливаем успех
    if (isValid && code === '4444') {
      setIsSuccess(true);
      setHasError(false); // Сбрасываем ошибку, если код правильный
    } else {
      setIsSuccess(false);
    }
  }, [code]);

  const handleCodeChange = (text: string) => {
    setCode(text);
    setHasError(false); // Сбрасываем ошибку при изменении кода
  };

  const handleNext = () => {
    if (isFormValid) {
      if (code !== '4444') {
        setHasError(true); // Устанавливаем ошибку, если код неверный
        setIsSuccess(false);
      } else {
        setHasError(false);
        setIsSuccess(true);
        console.log('Verification code:', code);
        // Вызываем onVerificationSuccess для перехода в PlayerNavigator
        onVerificationSuccess();
      }
    }
  };

  const handleBackOrResend = () => {
    if (hasError) {
      // Логика для повторной отправки кода
      console.log('Resend verification code');
      setCode(''); // Сбрасываем код
      setHasError(false); // Сбрасываем ошибку
      setIsSuccess(false); // Сбрасываем успех
    } else {
      navigation.goBack(); // Возвращаемся на предыдущий экран
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Код верификации</Text>

              <Input
                isCode={true}
                value={code}
                onChangeText={handleCodeChange}
                keyboardType="numeric"
                hasError={hasError}
                isSuccess={isSuccess}
              />
              {hasError && <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>Неверный код</Text>}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Далее"
                onPress={handleNext}
                variant="primary"
                disabled={!isFormValid}
              />
              <Button
                title={hasError ? 'Отправить повторно' : 'Назад'}
                onPress={handleBackOrResend}
                variant={hasError ? 'primary' : 'text'}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default VerificationScreen;