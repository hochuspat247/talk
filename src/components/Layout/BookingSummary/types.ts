export interface BookingSummaryProps {
    /** Дата в формате "Сб, 17.12" */
    date: string;
    /** Количество гостей */
    guests: number;
    /** Стоимость в рублях */
    price: number;
  }