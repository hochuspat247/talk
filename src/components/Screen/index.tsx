// src/components/Screen.tsx

import React, { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './styled';

interface ScreenProps {
  children: ReactNode;
}

const Screen = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
