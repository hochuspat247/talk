
import { BookingAvailability } from '@api/models/booking';
import { PRICE_PER_SLOT } from '@constants/client/booking';

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const formatDateForBookingSummary = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options)
    .format(date)
    .replace(/\//g, '.')
    .replace(/,\s*/, ', ');
};

export const calculatePriceAndGuests = (
  slots: BookingAvailability[]
): { totalPrice: number; totalGuests: number } => {
  const totalSlots = slots.length;
  const totalPrice = totalSlots * PRICE_PER_SLOT;
  const totalGuests = slots.reduce((sum, slot) => {
    return sum + (slot.guests || 0);
  }, 0);
  return { totalPrice, totalGuests };
};