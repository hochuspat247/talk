import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '@components/Input';
import Button from '@components/Button';
import * as ImagePicker from 'expo-image-picker';
import { RegisterFormData, FormErrors } from './types';
import { styles } from './styled';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
  ProfileOptions: undefined;
  Register: { isAdmin?: boolean };
  AccountCreated: undefined;
  Login: undefined;
  Verification: undefined;
};

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { isAdmin = false } = route.params || {}; // Извлекаем isAdmin из параметров

  const [formData, setFormData] = useState<RegisterFormData>({
    lastName: '',
    firstName: '',
    birthDate: '',
    selectedImage: null,
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 1 });
    if (!result.canceled) {
      setFormData({ ...formData, selectedImage: result.assets[0].uri });
    }
  };

  const formatBirthDate = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 2 || i === 4) formatted += '.';
      formatted += cleaned[i];
    }
    setFormData({ ...formData, birthDate: formatted });
    return formatted;
  };

  const formatPhoneNumber = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('7')) cleaned = cleaned.substring(1);
    if (cleaned.startsWith('8')) cleaned = cleaned.substring(1);
    if (cleaned.length > 10) cleaned = cleaned.substring(0, 10);

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) {
      setFormData({ ...formData, phone: '+7(' });
      return '+7(';
    }

    let formatted = '+7';
    if (match[1]) formatted += '(' + match[1];
    if (match[1] && match[1].length === 3) formatted += ')';
    if (match[2]) formatted += match[2];
    if (match[3]) formatted += '-' + match[3];
    if (match[4]) formatted += '-' + match[4];

    setFormData({ ...formData, phone: formatted });
    return formatted;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию';
      if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя';
      if (!formData.birthDate) newErrors.birthDate = 'Введите дату рождения';
      else {
        const [day, month, year] = formData.birthDate.split('.');
        if (!day || !month || !year || parseInt(day) > 31 || parseInt(month) > 12 || formData.birthDate.length !== 10) {
          newErrors.birthDate = 'Неверный формат даты (ДД.ММ.ГГГГ)';
        }
      }
    } else if (step === 2) {
      if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Неверный формат email';
      if (!formData.phone.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/)) newErrors.phone = 'Неверный формат телефона (+7(XXX)XXX-XX-XX)';
      if (formData.password.length < 6) newErrors.password = 'Пароль должен быть минимум 6 символов';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
      if (!isAgreed) newErrors.agreement = 'Необходимо согласиться с правилами';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, isAgreed, step]);

  const handleNext = () => {
    setShowErrors(true);
    if (isFormValid) {
      if (step === 1) {
        setStep(2);
        setShowErrors(false);
      } else if (step === 2) {
        console.log('Register:', formData);
        // После успешной регистрации переходим на AccountCreatedScreen, если это админ
        if (isAdmin) {
          navigation.navigate('AccountCreated');
        } else {
          // Для обычного пользователя переходим на VerificationScreen или другой экран
          navigation.navigate('Verification');
        }
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setShowErrors(false);
      setErrors({});
    } else if (step === 1) {
      navigation.goBack();
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/register-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Создать аккаунт</Text>

            {step === 1 && (
              <>
                <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                  {formData.selectedImage ? (
                    <Image source={{ uri: formData.selectedImage }} style={styles.selectedImage} />
                  ) : (
                    <Image
                      source={require('../../../../assets/icons/Upload Photo.png')}
                      style={styles.uploadIcon}
                    />
                  )}
                </TouchableOpacity>
                
                <Input
                  placeholder="Фамилия"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                />
                {showErrors && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                <Input
                  placeholder="Имя"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                />
                {showErrors && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                <Input
                  placeholder="ДД.ММ.ГГГГ"
                  value={formData.birthDate}
                  onChangeText={formatBirthDate}
                  keyboardType="numeric"
                  maxLength={10}
                />
                {showErrors && errors.birthDate && <Text style={styles.error}>{errors.birthDate}</Text>}
              </>
            )}

            {step === 2 && (
              <>
                <Input
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                />
                {showErrors && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <Input
                  placeholder="+7(XXX)XXX-XX-XX"
                  value={formData.phone}
                  onChangeText={formatPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={13}
                />
                {showErrors && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                <Input
                  placeholder="Пароль"
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  hasIcon
                  secureTextEntry
                />
                {showErrors && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                <Input
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  hasIcon
                  secureTextEntry
                />
                {showErrors && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsAgreed(!isAgreed)}>
                  <View style={[styles.checkbox, isAgreed && styles.checkboxActive]}>
                    {isAgreed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxText}>Я согласен с правилами пользования</Text>
                </TouchableOpacity>
                {showErrors && errors.agreement && <Text style={styles.error}>{errors.agreement}</Text>}
              </>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Далее"
              onPress={handleNext}
              variant="primary"
              disabled={!isFormValid}
            />
            <Button title="Назад" onPress={handleBack} variant="text" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;