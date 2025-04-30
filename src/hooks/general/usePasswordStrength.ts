// src/hooks/general/usePasswordStrength.ts

/**
 * Хук для проверки силы пароля.
 * @param password - Пароль для проверки.
 * @returns Числовое значение силы пароля (0-4).
 */
export const usePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};