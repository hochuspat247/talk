import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styled';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'text' | 'error'; // Добавлен error
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary', // По умолчанию primary
}) => {
  const getButtonStyle = () => {
    if (disabled) return styles.disabled;
    if (variant === 'text') return styles.text;
    if (variant === 'error') return styles.error; // Новый стиль для красной кнопки
    return styles.enabled;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]} // Применяем стиль в зависимости от состояния
      onPress={onPress} // Кнопка всегда кликабельна
    >
      <Text style={[styles.buttonText, variant === 'text' && styles.textButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;