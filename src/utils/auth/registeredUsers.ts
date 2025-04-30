import { unformatPhoneNumber } from '@components/UI/Input/utils';

export const registeredUsers = [
  '+79991234567', // Зарегистрированный номер
];

/**
 * Проверяет, зарегистрирован ли номер телефона.
 * @param phone - Номер телефона для проверки.
 * @returns `true`, если номер зарегистрирован, иначе `false`.
 */
export const isPhoneNumberRegistered = (phone: string): boolean => {
  const normalizedPhone = unformatPhoneNumber(phone);
  return registeredUsers.some(userPhone => unformatPhoneNumber(userPhone) === normalizedPhone);
};

/**
 * Добавляет нового пользователя в список зарегистрированных (на фронте).
 * @param phone - Номер телефона пользователя.
 * @param password - Пароль пользователя.
 */
export const registerUser = (phone: string, password: string) => {
  const normalizedPhone = unformatPhoneNumber(phone);
  registeredUsers.push(normalizedPhone);
  console.log(`Пользователь ${normalizedPhone} зарегистрирован с паролем ${password}`);
};