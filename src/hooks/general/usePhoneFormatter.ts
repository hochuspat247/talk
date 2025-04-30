// src/hooks/general/usePhoneFormatter.ts
import { PHONE_LENGTH_REQUIRED } from '@constants/phone';

/**
 * Хук для форматирования номера телефона.
 * @param phone - Номер телефона для форматирования.
 * @returns Отформатированный номер телефона.
 */
export const usePhoneFormatter = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < PHONE_LENGTH_REQUIRED) return phone;
  return `+${digits[0]} ${digits.substring(1, 4)} ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
};