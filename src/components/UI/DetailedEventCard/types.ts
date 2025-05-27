export interface DetailedEventCardProps {
  title: string;
  timeRange: string; 
  location: string; 
  status: 'Активно' | 'Подтверждено' | string;
  price: string; 
}