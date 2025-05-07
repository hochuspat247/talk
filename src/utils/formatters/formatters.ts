export const formatTime = (text: string): string => {
    const digits = text.replace(/[^0-9]/g, '').slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
  };