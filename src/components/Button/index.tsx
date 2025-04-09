import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styled';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'text' | 'error';
  style?: object; // Добавляем пропс style для кастомизации
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
}) => {
  const getButtonStyle = () => {
    if (disabled) return styles.disabled;
    if (variant === 'text') return styles.text;
    if (variant === 'error') return styles.error;
    return styles.enabled;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]} // Применяем стиль в зависимости от состояния и добавляем кастомный стиль
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'text' && styles.textButtonText,
          variant === 'error' && styles.errorButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;