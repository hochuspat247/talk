import moment from 'moment';
import { CalculatePositionParams, PositionData, TimeSlot } from './types';








export const initializeTimeSlots = (bookedSlots: TimeSlot[], startHour: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour < 23; hour++) {
    const start = `${String(hour).padStart(2, '0')}:00`;
    const end = `${String(hour + 1).padStart(2, '0')}:00`;

    const bookedSlot = bookedSlots.find((bs) => bs.start === start && bs.end === end);
    const isBooked = bookedSlot?.isBooked || bookedSlot?.is_booked || false;

    slots.push({
      start,
      end,
      isBooked,
      events: bookedSlot?.events || [],
    });
  }

  return slots;
};







export const calculatePosition = ({
  timeSlots,
  currentDate,
  isToday,
  startHour,
  scrollOffset,
  timeTextHeight,
  standardSlotHeight,
  largeCardHeight,
  smallCardHeight,
}: CalculatePositionParams): PositionData => {
  const now = new Date();
  const localMoment = moment(now);
  const currentHour = localMoment.hour();
  const currentMinute = localMoment.minute();

  const isWithinRange = isToday && (currentHour >= startHour || (currentHour < startHour && localMoment.isSame(currentDate, 'day')));

  if (!isWithinRange) {
    return { isWithinRange: false, position: 0, adjustedPosition: 0 };
  }

  const effectiveHour = currentHour < startHour ? startHour : currentHour;
  const slotIndex = Math.min(Math.max(effectiveHour - startHour, 0), timeSlots.length - 1);

  const minutesPerSection = 12;
  const sectionIndex = Math.floor(currentMinute / minutesPerSection);

  let position = 0;
  for (let i = 0; i < slotIndex; i++) {
    const slot = timeSlots[i];
    let slotHeight = standardSlotHeight;
    if (slot?.events && slot.events.length > 0) {
      slotHeight = slot.events.length === 1 ? largeCardHeight : smallCardHeight;
    }
    position += timeTextHeight + slotHeight;
  }
  position += timeTextHeight;

  const currentSlot = timeSlots[slotIndex];
  let currentSlotHeight = standardSlotHeight;
  if (currentSlot?.events && currentSlot.events.length > 0) {
    currentSlotHeight = currentSlot.events.length === 1 ? largeCardHeight : smallCardHeight;
  }
  const sectionOffset = (sectionIndex * currentSlotHeight) / 5;

  position += sectionOffset;

  const adjustedPosition = position - scrollOffset;

  return { isWithinRange: true, position, adjustedPosition };
};