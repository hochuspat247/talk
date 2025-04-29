// src/components/Button/index.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styled';
import { ButtonProps, ButtonVariant } from './types';
import { VARIANT_CONFIG, DISABLED_CONFIG, BLOCKED_CONFIG } from './variants';
import { getIconStyle } from './utils';

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
  const isBigButton = variant !== 'icon' || size === 'large';

  const config = block ? BLOCKED_CONFIG : isDisabled ? DISABLED_CONFIG : VARIANT_CONFIG[variant] || VARIANT_CONFIG.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        config.buttonStyle,
        getIconStyle(variant, size),
        isBigButton && { width: '100%' },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.content}>
        {variant === 'with-icon-right' ? (
          <>
            <Text style={config.textStyle}>{title}</Text>
            {showIcon && iconName && (
              <Ionicons
                name={iconName}
                size={24}
                color={config.iconColor}
                style={{ marginLeft: 8 }}
              />
            )}
          </>
        ) : (
          <>
            {variant !== 'icon' && <Text style={config.textStyle}>{title}</Text>}
            {showIcon && iconName && (
              <Ionicons
                name={iconName}
                size={24}
                color={config.iconColor}
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