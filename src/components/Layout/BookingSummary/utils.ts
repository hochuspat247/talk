import { Dimensions } from 'react-native';
import { BookingSummaryProps } from './types';

const { width } = Dimensions.get('window');

/**
 * Минимальный размер шрифта для текстов справа.
 */
const MIN_FONT_SIZE = 8;

/**
 * Начальный размер шрифта для текстов справа.
 */
const INITIAL_FONT_SIZE = 14;

/**
 * Рассчитывает размер шрифта для текстов "Кол-во чел" и "Плата выручки" на основе доступной ширины экрана.
 *
 * @param {Object} params - Параметры для расчёта.
 * @param {string} params.date - Дата в формате "Сб, 17.12".
 * @param {number} params.guests - Количество гостей.
 * @param {number} params.price - Стоимость в рублях.
 * @param {number} params.currentFontSize - Текущий размер шрифта.
 * @returns {number} Новый размер шрифта.
 */
export const calculateInfoFontSize = ({
  date,
  guests,
  price,
  currentFontSize,
}: BookingSummaryProps & { currentFontSize: number }): number => {
  const availableWidth = width - 32; // Учитываем marginHorizontal: 16 с каждой стороны
  const dateFontSize = 20;

  // Примерная ширина текста даты (фиксированная)
  const dateTextWidth = date.length * (dateFontSize / 2);

  // Примерная ширина текста справа
  const rightTextWidth =
    (('Кол-во чел: ' + guests).length + ('Плата выручки: ' + price.toLocaleString() + ' ₽').length) *
    (currentFontSize / 2);

  // Общая ширина
  const totalWidth = dateTextWidth + rightTextWidth + 50; // 50 — запас на margin и padding

  if (totalWidth > availableWidth) {
    return Math.max(MIN_FONT_SIZE, currentFontSize - 1);
  } else if (totalWidth < availableWidth - 50 && currentFontSize < INITIAL_FONT_SIZE) {
    return Math.min(INITIAL_FONT_SIZE, currentFontSize + 1);
  }
  return currentFontSize;
};

/**
 * Форматирует цену в рублях с добавлением символа валюты.
 *
 * @param {number} price - Стоимость в рублях.
 * @returns {string} Отформатированная строка с ценой (например, "6 000 ₽").
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} ₽`;
};