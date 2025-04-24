import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TransparentContainerProps {
  children?: React.ReactNode;
  style?: object;
}

const TransparentContainer: React.FC<TransparentContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Абсолютное позиционирование
    bottom: 0, // Прижимаем к нижнему краю
    left: 0, // Устанавливаем левую границу
    right: 0, // Устанавливаем правую границу
    zIndex: 10, // Устанавливаем zIndex, чтобы быть поверх других элементов
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Прозрачный фон
    borderRadius: 20, // Закругление углов 20
    padding: 8, // Отступы от краев 8
  },
});

export default TransparentContainer;