import { ExperienceOption } from "./types";

export const DEFAULT_EXPERIENCE: ExperienceOption = 'LessThan1Year';

export const EXPERIENCE_OPTIONS: Array<{
  value: ExperienceOption;
  label: string;
}> = [
  { value: 'LessThan1Year', label: 'Менее 1 года' },
  { value: '1To3Years', label: '1-3 года' },
  { value: '3To5Years', label: '3-5 лет' },
  { value: '5To10Years', label: '5-10 лет' },
  { value: 'MoreThan10Years', label: 'Более 10 лет' },
];

export const COLORS = {
  LABEL: '#000',
  BUTTON_DEFAULT: '#E6E6E6',
  BUTTON_SELECTED: '#8097F0',
  TEXT_DEFAULT: '#BFBFBF',
  TEXT_SELECTED: '#FBFBFB',
};

export const SIZES = {
  LABEL_FONT: 16,
  BUTTON_FONT: 14,
  BUTTON_PADDING_VERTICAL: 6,
  BUTTON_PADDING_HORIZONTAL: 12,
  BUTTON_GAP: 7,
  LABEL_MARGIN_BOTTOM: 15,
};