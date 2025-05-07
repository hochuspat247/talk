import moment from 'moment';
import { MockBookingAvailability } from './types';
import { PRICE_PER_SLOT } from './constants';







export const formatDate = (date: Date): string => {
  const localMoment = moment(date);
  const year = localMoment.year();
  const month = String(localMoment.month() + 1).padStart(2, '0');
  const day = String(localMoment.date()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};







export const formatDateForBookingSummary = (date: Date): string => {
  return moment(date)
    .format('ddd, DD.MM')
    .replace(/\//g, '.');
};







export const calculatePriceAndGuests = (slots: MockBookingAvailability[]): { totalPrice: number; totalGuests: number } => {
  const totalSlots = slots.length;
  const totalPrice = totalSlots * PRICE_PER_SLOT;
  const totalGuests = slots.reduce((sum, slot) => {
    return sum + (slot.guests || 0);
  }, 0);
  return { totalPrice, totalGuests };
};