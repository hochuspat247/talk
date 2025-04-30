import { useState, useCallback } from 'react';

export const useSecureEntry = (initialSecure: boolean) => {
  const [isSecure, setIsSecure] = useState(initialSecure);

  const toggleSecureEntry = useCallback(() => {
    setIsSecure((prev) => !prev);
  }, []);

  return { isSecure, toggleSecureEntry };
};