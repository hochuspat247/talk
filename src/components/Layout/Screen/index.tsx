import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styled';
import { ScreenProps } from './types';

console.log('[Screen] styles =', styles);
console.log('[Screen] styles.container =', styles?.container);

const Screen: React.FC<ScreenProps> = ({ children, style, contentContainerStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default Screen;