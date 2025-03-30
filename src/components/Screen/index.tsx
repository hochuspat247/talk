import React, { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';
import { styles } from './styled';

interface ScreenProps {
  children: ReactNode;
  noPaddingTop?: boolean; // Новый пропс для отключения paddingTop
}

const Screen = ({ children, noPaddingTop = false }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, noPaddingTop && { paddingTop: 0 }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Screen;