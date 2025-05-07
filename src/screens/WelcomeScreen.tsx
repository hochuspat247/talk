import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WaveBackground from '@components/UI/WaveBackground';
import TransparentContainer from '@components/Layout/TransparentContainer';
import ToggleSwitch from '@components/UI/ToggleSwitch';
import Button from '@components/UI/Button';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';
import { TEXTS } from '@constants/Texts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AuthNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [role, setRole] = useState<'master' | 'client'>('master');


  return (
    <View style={styles.container}>

      
      {}
      <WaveBackground colorScheme="default" />
      
      {}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.WELCOME_TITLE}</Text>
        <Text style={styles.subtitle}>{TEXTS.WELCOME_MESSAGE}</Text>
      </View>
      
      {}
      <TransparentContainer>
        <ToggleSwitch
          onChange={(value) => setRole(value)}
          initialValue={role}
        />
        <Button
          title={`${TEXTS.CONTINUE_AS} ${role === 'master' ? TEXTS.MASTER : TEXTS.CLIENT}`}
          onPress={() => navigation.navigate('Login')}
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
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.NEXT_ART_BOLD,
    fontSize: 67,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 24,
    color: Colors.text,
    marginTop: 8,
  },
  version: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default WelcomeScreen;