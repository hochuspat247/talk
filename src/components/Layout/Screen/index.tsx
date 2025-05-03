import React from 'react';
import { ScrollView, View, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styled';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * Компонент-обёртка для экрана с прокруткой и заданными отступами.
 * @param children - Дочерние элементы.
 * @param style - Стили для внешнего контейнера.
 * @param contentContainerStyle - Стили для контейнера содержимого ScrollView.
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