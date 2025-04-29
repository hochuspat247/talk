// src/components/Input/components/CodeInput.tsx
import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from '../styled';
import { InputProps } from '../types';

const CodeInput: React.FC<InputProps> = ({ value, onChangeText, hasError, isSuccess, style }) => {
  const [, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<TextInput[]>([]);
  const codeValues = value.padEnd(4, '').split('').slice(0, 4);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newCode = [...codeValues];
    newCode[index] = text;
    onChangeText(newCode.join(''));
    if (text && index < 3) inputRefs.current[index + 1]?.focus();
    else if (!text && index > 0) inputRefs.current[index - 1]?.focus();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputRefs.current[i] = ref!)}
            style={[
              styles.codeInput,
              hasError && styles.codeInputError,
              isSuccess && styles.codeInputSuccess,
            ]}
            value={codeValues[i]}
            onChangeText={(text) => handleCodeChange(text, i)}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={i === 0}
          />
        ))}
      </View>
    </View>
  );
};

export default CodeInput;