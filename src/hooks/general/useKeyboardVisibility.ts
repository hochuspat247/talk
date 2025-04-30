// src/hooks/general/useKeyboardVisibility.ts
import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

/**
 * Хук для отслеживания видимости клавиатуры.
 * @returns Булево значение, указывающее, видима ли клавиатура.
 */
export const useKeyboardVisibility = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardVisible;
};