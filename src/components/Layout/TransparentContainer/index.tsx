// src/components/TransparentContainer/index.tsx
import React from 'react';
import { View } from 'react-native';
import { styles } from './styled';
import { TransparentContainerProps } from './types';

const TransparentContainer: React.FC<TransparentContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default TransparentContainer;