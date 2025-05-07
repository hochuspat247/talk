import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styled';
import { ScreenProps } from './types';

/**
 * Компонент-обёртка для экрана с прокруткой и заданными отступами.
 *
 * @param {ScreenProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент экрана.
 */
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