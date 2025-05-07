import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ExperienceControlProps, ExperienceOption } from './types';
import { styles } from './styled';
import { EXPERIENCE_OPTIONS, DEFAULT_EXPERIENCE } from './constants';
import { handleOptionPress } from './utils';








const ExperienceControl: React.FC<ExperienceControlProps> = ({ onChange, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState<ExperienceOption>(
    initialValue ?? DEFAULT_EXPERIENCE
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Опыт работы</Text>
      <View style={styles.buttonContainer}>
        {EXPERIENCE_OPTIONS.map(({ value, label }) => (
          <TouchableOpacity
            key={value}
            style={[styles.button, selectedOption === value && styles.selectedButton]}
            onPress={() => handleOptionPress(value, setSelectedOption, onChange)}
            accessibilityLabel={`Выбрать опыт: ${label}`}
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

export default ExperienceControl;