import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const formatDate = (date: string) => {
  const m = moment(date, 'YYYY-MM-DD');
  return {
    dayName: m.format('ddd').toUpperCase(), // ПН, ВТ, СР ...
    dayNum: m.format('DD.MM'), // 12.12, 13.12...
  };
};