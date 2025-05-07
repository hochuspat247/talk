/**
 * Обрезает текст до указанной длины, если он превышает её.
 *
 * @param {string} text - Текст для обрезки.
 * @param {number} maxLength - Максимальная длина текста.
 * @returns {string} Обрезанный текст.
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim();
  };