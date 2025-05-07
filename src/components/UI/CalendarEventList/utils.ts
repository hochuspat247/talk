/**
 * Парсит продолжительность из строки в минуты.
 *
 * @param {string} duration - Продолжительность в формате "Xч Yмин".
 * @returns {number} Продолжительность в минутах.
 */
export const parseDurationToMinutes = (duration: string): number => {
    const parts = duration.match(/^(?:(\d+)ч)?\s*(?:(\d+)мин)?$/);
    if (!parts) return 0;
  
    const hours = parseInt(parts[1] || '0', 10);
    const minutes = parseInt(parts[2] || '0', 10);
    return hours * 60 + minutes;
  };
  
  /**
   * Форматирует общее количество минут в строку вида "Xч Yмин".
   *
   * @param {number} totalMinutes - Общее количество минут.
   * @returns {string} Отформатированная строка продолжительности.
   */
  export const formatTotalDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes}мин`;
    if (minutes === 0) return `${hours}ч`;
    return `${hours}ч ${minutes}мин`;
  };