export interface AvailabilityCalendarProps {
  availability: Record<string, boolean>;
  selectedDate?: string;
  onDatePress?: (date: string) => void;
}