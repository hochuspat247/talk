// constants.ts

import { FilterState } from './types';

export const DEFAULT_FILTERS: FilterState = {
  men: false,
  women: false,
  children: false,
};

export const FILTER_LABELS = {
  men: 'Мужчины',
  women: 'Женщины',
  children: 'Дети до 14 лет',
};

// Новые метки для режима "Новая запись"
export const NEW_BOOKING_LABELS = {
  men: 'Повторить запись',
  women: 'Выезд по адресу',
  children: 'Напоминание',
};

export const COLORS = {
  TRACK_INACTIVE: '#E3E3E3',
  TRACK_ACTIVE: '#8097F01A',
  THUMB_ACTIVE: '#8097F0',
  THUMB_INACTIVE: '#999999',
  LABEL_INACTIVE: '#BFBFBF',
  LABEL_ACTIVE: '#8097F0',
  HEADER: '#000',
};

export const SIZES = {
  HEADER_FONT: 16,
  LABEL_FONT: 14,
};