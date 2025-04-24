import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styled';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  block?: boolean; // 👈 добавлено
  variant?: 'primary' | 'secondary' | 'text' | 'accent' | 'icon' | 'with-icon-right';
  style?: StyleProp<ViewStyle>;
  showIcon?: boolean;
  iconName?: string;
  size?: 'small' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  block = false,
  variant = 'primary',
  style,
  showIcon = false,
  iconName,
  size = 'large',
}) => {
  const isDisabled = disabled || block;

  const getButtonStyle = () => {
    if (block) return styles.blocked;
    if (isDisabled) return styles.disabled;
    switch (variant) {
      case 'text':
        return styles.text;
      case 'accent':
        return styles.accent;
      case 'secondary':
        return styles.secondary;
      case 'with-icon-right':
        return styles.primary;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    if (block) return styles.blockedText;
    if (variant === 'text') return styles.textButtonText;
    return styles.buttonText;
  };

  const getIconStyle = () => {
    if (variant !== 'icon') return undefined;
    return size === 'small' ? styles.iconVariantSmall : styles.iconVariantFull;
  };

  const isBigButton = variant !== 'icon' || size === 'large';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getIconStyle(),
        isBigButton && { width: '100%' },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.content}>
        {variant === 'with-icon-right' ? (
          <>
            <Text style={getTextStyle()}>{title}</Text>
            {showIcon && iconName && (
              <Ionicons
                name={iconName}
                size={24}
                color={block ? '#96989F' : '#fff'}
                style={{ marginLeft: 8 }}
              />
            )}
          </>
        ) : (
          <>
            {variant !== 'icon' && <Text style={getTextStyle()}>{title}</Text>}
            {showIcon && iconName && (
              <Ionicons
                name={iconName}
                size={24}
                color={
                  block
                    ? '#96989F'
                    : variant === 'text'
                    ? '#000'
                    : '#fff'
                }
                style={variant !== 'icon' ? styles.icon : undefined}
              />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
