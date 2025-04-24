// screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WavesBackground from '@components/UI/WaveBackground';
import ToggleSwitch from '@components/UI/ToggleSwitch';
import TransparentContainer from '@components/UI/TransparentContainer';

const WelcomeScreen = () => {
  const handleToggleChange = (value: 'master' | 'client') => {
    console.log(`Selected role: ${value}`);
  };

  return (
    <View style={styles.container}>
      {/* Волны как фон */}
      {/* Можно использовать colorScheme="alternate" для новых цветов */}
       <WavesBackground  /> 

      {/* Контент по центру */}
 
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
    zIndex: 10, // поверх волн
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  subtitle: {
    fontSize: 22,
    color: '#2C2C2C',
    marginTop: 10,
  },
});

export default WelcomeScreen;