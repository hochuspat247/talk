export type Event = {
  id: string;
  title: string;
  timeRange: string; 
  location: string; 
  status: 'Активно' | 'Подтверждено' | string;
  price: string; 
};

export type DayEvents = {
  date: string; 
  events: Event[];
};

export interface WeeklyEventsListProps {
  days: DayEvents[];
}