import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const getCalendarDays = (currentMonth: moment.Moment): moment.Moment[] => {
  const start = currentMonth.clone().startOf('month').startOf('week').add(1, 'day');
  const end = currentMonth.clone().endOf('month').endOf('week').add(1, 'day');
  const days: moment.Moment[] = [];
  const cursor = start.clone();
  while (cursor.isSameOrBefore(end, 'day')) {
    days.push(cursor.clone());
    cursor.add(1, 'day');
  }
  return days;
};