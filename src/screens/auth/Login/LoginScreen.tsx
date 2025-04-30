import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WaveBackground from '@components/UI/WaveBackground';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import { TEXTS } from '@constants/Texts';
import TransparentContainer from '@components/UI/TransparentContainer';

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  // Проверяем, является ли номер полным (11 цифр, включая +7)
  const isPhoneNumberComplete = phoneNumber.length === 11;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.WELCOME_TITLE}</Text>
        <Text style={styles.subtitle}>{TEXTS.LOGIN_MESSAGE}</Text>
      </View>

      <WaveBackground colorScheme="alternate" />

      <TransparentContainer>
        <Input
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          variant="phone"
          style={styles.input}
        />
        <Button
          title={TEXTS.LOGIN_BUTTON}
          onPress={() => console.log(`Продолжить с номером: ${phoneNumber}`)}
          variant="with-icon-right"
          showIcon
          iconName="arrow-forward"
          block={!isPhoneNumberComplete} // Блокируем кнопку, если номер не полный
        />
        <View style={styles.linksContainer}>
          <Text style={styles.link}>{TEXTS.FORGOT_PASSWORD}</Text>
          <Text style={styles.link}>{TEXTS.SUPPORT}</Text>
        </View>
      </TransparentContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.NEXT_ART_BOLD,
    fontSize: 67,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 23,
    color: Colors.text,
    marginTop: 8,
  },
  input: {
    marginBottom: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  link: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.white,
  },
});

export default LoginScreen;