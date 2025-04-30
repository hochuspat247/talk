/**
 * Форматирует номер телефона для отображения в формате +X XXX XXX-XX-XX.
 * @param phone - Номер телефона в любом формате.
 * @returns Отформатированный номер телефона или исходная строка, если длина недостаточна.
 */
export const formatPhoneForDisplay = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 11) return phone;
    return `+${digits[0]} ${digits.substring(1, 4)} ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9, 11)}`;
  };