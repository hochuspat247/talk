import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/AuthNavigator';
import Input from '@components/Input';
import Button from '@components/UI/Button';
import { login } from '@api/auth'; // Импортируем функцию login из API
import { styles } from './styled';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [phone, setPhone] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState(false); // Состояние для валидности номера
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние для загрузки
  const navigation = useNavigation<LoginScreenNavigationProp>();

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

  const handleLogin = async () => {
    if (!isPhoneValid) {
      Alert.alert('Ошибка', 'Неверный формат номера телефона (+7(XXX)XXX-XX-XX)');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await login(phone);
      navigation.navigate('Verification', { phone, userId: response.user_id });
    } catch (error: any) {
      const errorMessage =
        error.code === 404
          ? 'Пользователь с таким номером не найден'
          : error.message === 'Network Error'
          ? 'Не удалось подключиться к серверу. Проверьте подключение к сети.'
          : error.message || 'Не удалось войти';
      Alert.alert('Ошибка', errorMessage);
    } finally {
      setIsLoading(false);
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
              disabled={!isPhoneValid || isLoading} // Кнопка неактивна, пока номер не валиден или идёт загрузка
            />
            <Button
              title="Назад"
              onPress={handleBack}
              variant="text"
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;