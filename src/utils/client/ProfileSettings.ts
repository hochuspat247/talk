import { useCallback } from 'react';
import { FormState } from '@screens/Client/Profile/ProfileSettings/types';

export const createFieldChangeHandler = <K extends keyof FormState>(
  setState: React.Dispatch<React.SetStateAction<FormState>>,
  key: K
) => {
  return useCallback(
    (value: FormState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [setState, key]
  );
};