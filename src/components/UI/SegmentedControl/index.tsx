import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SegmentedControlProps, GenderOption } from './types';
import { styles } from './styled';
import { GENDER_OPTIONS, DEFAULT_GENDER } from './constants';
import { handleOptionPress } from './utils';








const SegmentedControl: React.FC<SegmentedControlProps> = ({ onChange, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState<GenderOption>(
    initialValue ?? DEFAULT_GENDER
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Пол</Text>
      <View style={styles.buttonContainer}>
        {GENDER_OPTIONS.map(({ value, label }, index) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.button,
              index === 0 && styles.buttonLeft,
              selectedOption === value && styles.selectedButton,
            ]}
            onPress={() => handleOptionPress(value, setSelectedOption, onChange)}
            accessibilityLabel={`Выбрать пол: ${label}`}
          >
            <Text style={[styles.text, selectedOption === value && styles.selectedText]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SegmentedControl;