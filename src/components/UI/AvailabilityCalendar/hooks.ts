import { useState } from 'react';
import moment from 'moment';

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(
    moment().startOf('month')
  );

  const prevMonth = () => setCurrentMonth((m) => m.clone().subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth((m) => m.clone().add(1, 'month'));

  return { currentMonth, prevMonth, nextMonth };
};