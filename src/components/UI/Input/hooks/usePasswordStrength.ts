import { useState, useEffect } from 'react';

export const usePasswordStrength = (password: string, externalStrength?: number): number => {
  const [internalStrength, setInternalStrength] = useState(0);

  const checkPasswordStrength = (text: string) => {
    let strength = 0;
    if (text.length >= 8) strength += 1;
    if (/[A-Z]/.test(text) && /[a-z]/.test(text)) strength += 1;
    if (/[0-9]/.test(text)) strength += 1;
    if (/[^A-Za-z0-9]/.test(text)) strength += 1;
    return strength;
  };

  useEffect(() => {
    if (externalStrength === undefined) {
      const strength = checkPasswordStrength(password);
      setInternalStrength(strength);
    }
  }, [password, externalStrength]);

  return externalStrength ?? internalStrength;
};