import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import WavesBackground from '@components/UI/WaveBackground';
import TransparentContainer from '@components/UI/TransparentContainer';
import { FONTS } from '@constants/Fonts';
import { TEXTS } from '@constants/Texts';
import Input from '@components/UI/Input';

const WelcomeScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [passwordWithText, setPasswordWithText] = useState('');
  const [passwordWithoutText, setPasswordWithoutText] = useState('');
  const [passwordSimple, setPasswordSimple] = useState('');

  const [mapInput, setMapInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [clearableInput, setClearableInput] = useState('');
  const [copyableInput, setCopyableInput] = useState('');
  const [codeInput, setCodeInput] = useState('');

  const [isPasswordWithTextValid, setIsPasswordWithTextValid] = useState(false);
  const [isPasswordWithoutTextValid, setIsPasswordWithoutTextValid] = useState(false);
  const [hasPasswordSimpleError, setHasPasswordSimpleError] = useState(false);

  const [isCodeValid, setIsCodeValid] = useState(false);
  const [hasCodeError, setHasCodeError] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'NEXTART_Bold': require('../../assets/fonts/NEXTART_Bold.otf'),
        'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
        'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setIsPasswordWithTextValid(validatePassword(passwordWithText));
    setIsPasswordWithoutTextValid(validatePassword(passwordWithoutText));
    setHasPasswordSimpleError(passwordSimple.length > 0 && passwordSimple.length < 5);
    setIsCodeValid(codeInput.length === 4);
    setHasCodeError(codeInput.length > 0 && codeInput.length < 4);
  }, [passwordWithText, passwordWithoutText, passwordSimple, codeInput]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <WavesBackground />
      <View style={styles.content}>
        <TransparentContainer>

          {/* ✅ Режим 1: Текст соглашения (без шкалы) */}
          <Input
  value={passwordWithText}
  onChangeText={setPasswordWithText}
  secureTextEntry
  variant="password"
  agreeMode // ← Вставит нужный текст внутрь автоматически
/>

          {/* ✅ Режим 2: Шкала и оценка (без текста) */}
          <Input
            value={passwordWithoutText}
            onChangeText={setPasswordWithoutText}
            secureTextEntry
            variant="password"
            passwordStrength={getPasswordStrength(passwordWithoutText)}
            showStrengthBar
            style={styles.inputSpacing}
          />

          {/* ✅ Режим 3: Простой пароль с ошибкой */}
          <Input
            value={passwordSimple}
            onChangeText={setPasswordSimple}
            secureTextEntry
            variant="password"
            hasError={hasPasswordSimpleError}
            style={styles.inputSpacing}
          />

          {/* Остальные поля */}
          <Input value={mapInput} onChangeText={setMapInput} variant="map" style={styles.inputSpacing} />
          <Input value={searchInput} onChangeText={setSearchInput} variant="search" style={styles.inputSpacing} />
          <Input value={userInput} onChangeText={setUserInput} variant="user" style={styles.inputSpacing} />
          <Input value={descriptionInput} onChangeText={setDescriptionInput} variant="description" style={styles.inputSpacing} />
          <Input value={timeInput} onChangeText={setTimeInput} variant="time" style={styles.inputSpacing} />

        </TransparentContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  inputSpacing: {
    marginTop: 5,
  },
});

export default WelcomeScreen;
