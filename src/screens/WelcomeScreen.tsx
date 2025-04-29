// src/screens/WelcomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WaveBackground from '@components/UI/WaveBackground';
import TransparentContainer from '@components/UI/TransparentContainer';
import ToggleSwitch from '@components/UI/ToggleSwitch';
import Button from '@components/UI/Button';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import { TEXTS } from '@constants/Texts';

const WelcomeScreen: React.FC = () => {
  const [role, setRole] = useState<'master' | 'client'>('master');

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.WELCOME_TITLE}</Text>
        <Text style={styles.subtitle}>{TEXTS.WELCOME_MESSAGE}</Text>
      </View>

      {/* Фоновые волны */}
      <WaveBackground colorScheme="default" />

      {/* Прозрачный контейнер с переключателем, кнопкой и текстом версии */}
      <TransparentContainer>
        <ToggleSwitch
          onChange={(value) => setRole(value)}
          initialValue={role}
        />
        <Button
          title={`${TEXTS.CONTINUE_AS} ${role === 'master' ? TEXTS.MASTER : TEXTS.CLIENT}`}
          onPress={() => console.log(`Продолжить как ${role}`)}
          variant="primary"
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
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 24,
    color: Colors.text, // #333333
    marginTop: 8,
  },
  version: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.white, // #FFFFFF
    textAlign: 'center',
  },
});

export default WelcomeScreen;