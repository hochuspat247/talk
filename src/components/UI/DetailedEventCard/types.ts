export interface DetailedEventCardProps {
  title: string;
  timeRange: string; // например "15:00–16:00"
  location: string; // например `"BEAUTY LAB STORE", Лубянский пр., стр. 1`
  status: 'Активно' | 'Подтверждено' | string;
  price: string; // например "1 500 ₽"
}