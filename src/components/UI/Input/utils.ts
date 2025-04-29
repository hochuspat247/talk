// src/components/Input/utils.ts
import * as Clipboard from 'expo-clipboard';

export const handleClear = (_value: string, onChangeText: (text: string) => void) => () => onChangeText('');

export const handleCopy = (value: string, _onChangeText: (text: string) => void) => async () => {
  if (value) {
    await Clipboard.setStringAsync(value);
  }
};