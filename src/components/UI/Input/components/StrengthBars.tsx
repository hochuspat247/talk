// src/components/Input/components/StrengthBars.tsx
import React from 'react';
import { View } from 'react-native';
import { styles } from '../styled';

interface StrengthBarsProps {
  strength: number;
}

const StrengthBars: React.FC<StrengthBarsProps> = ({ strength }) => (
  <View style={styles.strengthBarContainer}>
    {[0, 1, 2, 3].map((i) => (
      <View
        key={i}
        style={[
          styles.strengthBar,
          i < strength
            ? [styles.strengthBarActive, strength === 1 && styles.weak, strength === 2 && styles.medium, strength >= 3 && styles.strong]
            : styles.strengthBarInactive,
        ]}
      />
    ))}
  </View>
);

export default StrengthBars;