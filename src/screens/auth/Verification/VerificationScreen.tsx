import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AuthNavigator';
import Input from '@components/Input';
import Button from '@components/UI/Button';
import { verify, resendCode } from '@api/auth';
import { styles } from './styled';
import AsyncStorage from '@react-native-async-storage/async-storage';
type VerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Verification'>;

interface RouteParams {
  phone: string;
  userId: number;
}

interface VerificationScreenProps {
  onVerificationSuccess?: (role?: string) => void;
}

const VerificationScreen = ({ onVerificationSuccess }: VerificationScreenProps) => {
  const navigation = useNavigation<VerificationScreenNavigationProp>();
  const route = useRoute();
  const { phone, userId } = route.params as RouteParams;
  const [code, setCode] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isValid = code.length === 4 && /^\d{4}$/.test(code);
    setIsFormValid(isValid);
  }, [code]);

  const handleCodeChange = (text: string) => {
    setCode(text);
    setHasError(false);
    setIsSuccess(false);
  };

  const handleNext = async () => {
    if (!isFormValid) {
      Alert.alert('Ошибка', 'Код должен состоять из 4 цифр');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await verify(phone, code);
      setHasError(false);
      setIsSuccess(true);
  
      const role = response.role || 'user';
      const token = response.access_token;
      const userId = response.user_id;
  
      // СОХРАНЯЕМ ТОКЕН и userId В AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', userId.toString());
  
      if (onVerificationSuccess) {
        onVerificationSuccess(role);
      }
    } catch (error: any) {
      setHasError(true);
      setIsSuccess(false);
      const errorMessage = error.message === 'Invalid code' ? 'Неверный код' : error.message || 'Не удалось подтвердить код';
      Alert.alert('Ошибка', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackOrResend = async () => {
    if (hasError) {
      setIsLoading(true);
      try {
        await resendCode(phone);
        setCode('');
        setHasError(false);
        setIsSuccess(false);
        Alert.alert('Успех', 'Новый код отправлен');
      } catch (error: any) {
        const errorMessage = error.message || 'Не удалось отправить новый код';
        Alert.alert('Ошибка', errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      navigation.goBack();
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
                maxLength={4}
              />
              {hasError && <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>Неверный код</Text>}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Далее"
                onPress={handleNext}
                variant="primary"
                disabled={!isFormValid || isLoading}
              />
              <Button
                title={hasError ? 'Отправить повторно' : 'Назад'}
                onPress={handleBackOrResend}
                variant={hasError ? 'primary' : 'text'}
                disabled={isLoading}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default VerificationScreen;