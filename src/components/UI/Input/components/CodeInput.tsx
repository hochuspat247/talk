import React, { useRef, useState, useCallback } from 'react';
import { View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../styled';
import { InputProps } from '../types';

const CodeInput: React.FC<InputProps> = ({
  value,
  onChangeText,
  hasError,
  isSuccess,
  style,
  testID,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<TextInput[]>([]);
  const codeValues = value.padEnd(4, '').split('').slice(0, 4);

  const handleCodeChange = useCallback((text: string, index: number) => {
    if (text.length > 1) return;
    const newCode = [...codeValues];
    newCode[index] = text;
    const updatedCode = newCode.join('');
    onChangeText(updatedCode);
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [codeValues, onChangeText]);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputRefs.current[i] = ref!)}
            style={[
              styles.codeInput,
              hasError && styles.codeInputError,
              isSuccess && styles.codeInputSuccess,
              focusedIndex === i && styles.codeInputFocused,
            ]}
            value={codeValues[i]}
            onChangeText={(text) => handleCodeChange(text, i)}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={i === 0}
            testID={testID ? `${testID}-${i}` : undefined}
            accessibilityLabel={`Code digit ${i + 1}`}
          />
        ))}
      </View>
      </View>
  );
};

export default CodeInput;