import { unformatPhoneNumber } from '@components/UI/Input/utils';

export const registeredUsers = [
  '+79991234567', 
];

export const isPhoneNumberRegistered = (phone: string): boolean => {
  const normalizedPhone = unformatPhoneNumber(phone);
  return registeredUsers.some(userPhone => unformatPhoneNumber(userPhone) === normalizedPhone);
};

export const registerUser = (phone: string, password: string) => {
  const normalizedPhone = unformatPhoneNumber(phone);
  registeredUsers.push(normalizedPhone);
  console.log(`Пользователь ${normalizedPhone} зарегистрирован с паролем ${password}`);
};