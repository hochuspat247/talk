import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const formatDate = (date: string) => {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    dayName: m.format('ddd').toUpperCase(), 
    dayNum: m.format('DD.MM'), 
  };
};