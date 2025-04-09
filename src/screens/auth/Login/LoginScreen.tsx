import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '@components/Input';
import Button from '@components/Button';
import { styles } from './styled';

const LoginScreen = () => {
  const [phone, setPhone] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState(false); // Состояние для валидности номера
  const navigation = useNavigation();

  const formatPhoneNumber = (text: string) => {
    let cleaned = text.replace(/\D/g, ''); // Удаляем все нечисловые символы
    if (cleaned.startsWith('7')) cleaned = cleaned.substring(1); // Убираем 7 в начале
    if (cleaned.startsWith('8')) cleaned = cleaned.substring(1); // Убираем 8 в начале
    if (cleaned.length > 10) cleaned = cleaned.substring(0, 10); // Ограничиваем 10 цифрами

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) {
      setPhone('+7(');
      return '+7(';
    }

    let formatted = '+7';
    if (match[1]) formatted += '(' + match[1]; // Первые три цифры в скобках
    if (match[1] && match[1].length === 3) formatted += ')'; // Закрываем скобку после трёх цифр
    if (match[2]) formatted += match[2]; // Следующие три цифры без пробела
    if (match[3]) formatted += '-' + match[3]; // Две цифры после дефиса
    if (match[4]) formatted += '-' + match[4]; // Последние две цифры после дефиса

    setPhone(formatted);
    return formatted;
  };

  // Проверка валидности номера телефона
  useEffect(() => {
    const isValid = phone.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/); // Проверяем формат +7(XXX)XXX-XX-XX
    setIsPhoneValid(!!isValid);
  }, [phone]);

  const handleLogin = () => {
    if (isPhoneValid) {
      console.log('Login with phone:', phone);
      // Передаем номер телефона в VerificationScreen через параметры навигации
      navigation.navigate('Verification', { phone });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Вход</Text>

            <Input
              placeholder="+7(XXX)XXX-XX-XX"
              value={phone}
              onChangeText={formatPhoneNumber}
              keyboardType="phone-pad"
              maxLength={13} // Устанавливаем длину для маски +7(XXX)XXX-XX-XX
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Войти"
              onPress={handleLogin}
              variant="primary"
              disabled={!isPhoneValid} // Кнопка неактивна, пока номер не валиден
            />
            <Button
              title="Назад"
              onPress={handleBack}
              variant="text"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;