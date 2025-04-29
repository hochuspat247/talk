// src/screens/auth/Login/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import WaveBackground from '@components/UI/WaveBackground';
import TransparentContainer from '@components/UI/TransparentContainer';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import { TEXTS } from '@constants/Texts';

const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    console.log('Login with phone:', phone);
    // Здесь будет логика авторизации
  };

  const handlePolicyPress = () => {
    console.log('Открыть политику конфиденциальности');
    // Здесь будет логика открытия политики конфиденциальности
  };

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.WELCOME_TITLE}</Text>
        <Text style={styles.subtitle}>{TEXTS.LOGIN_TITLE}</Text>
      </View>

      {/* Фоновые волны */}
      <WaveBackground colorScheme="alternate" />

      {/* Прозрачный контейнер с полем ввода и кнопкой */}
      <TransparentContainer>
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder={TEXTS.LOGIN_PHONE_PLACEHOLDER}
          keyboardType="phone-pad"
        >
          <Text style={styles.subText}>
            {TEXTS.LOGIN_SUBTEXT.replace(TEXTS.LOGIN_SUBTEXT_HIGHLIGHTED, '')}
            <Pressable onPress={handlePolicyPress}>
              <Text style={styles.subTextHighlighted}>{TEXTS.LOGIN_SUBTEXT_HIGHLIGHTED}</Text>
            </Pressable>
          </Text>
        </Input>
        <Button
          title={TEXTS.LOGIN_BUTTON}
          onPress={handleLogin}
          variant="with-icon-right"
          showIcon
          iconName="arrow-forward"
        />
        <Text style={styles.version}>version 0.0.1 beta</Text>
      </TransparentContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // #FFFFFF
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.NEXT_ART_BOLD,
    fontSize: 48,
    color: Colors.text, // #333333
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 24,
    color: Colors.text, // #333333
    marginTop: 8,
  },
  subText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.grayMedium, // #999999
    marginTop: 5,
    textAlign: 'left',
  },
  subTextHighlighted: {
    color: Colors.orangeHighlight, // #FF8C00
  },
  version: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 14,
    color: Colors.white, // #FFFFFF
    textAlign: 'center',
  },
});

export default LoginScreen;