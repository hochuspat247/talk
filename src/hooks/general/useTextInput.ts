import { useCallback, useState } from 'react'; 


import { useKeyboardVisibility } from '@hooks';

interface UseTextInputParams {
  initialValue?: string;
  validate?: (value: string) => boolean;
  onChange?: (value: string) => void;
}

interface UseTextInputReturn {
  value: string;
  setValue: (text: string) => void;
  isValid: boolean;
  isKeyboardVisible: boolean;
}









export const useTextInput = ({
  initialValue = '',
  validate = () => true,
  onChange,
}: UseTextInputParams): UseTextInputReturn => {
  const [value, setValueState] = useState<string>(initialValue);
  const isKeyboardVisible = useKeyboardVisibility();

  const isValid: boolean = validate(value);

  const handleChange = useCallback(
    (text: string) => {
      setValueState(text);
      if (onChange) {
        onChange(text);
      }
    },
    [onChange]
  );

  return {
    value,
    setValue: handleChange,
    isValid,
    isKeyboardVisible,
  };
};