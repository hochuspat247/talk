import { GenderOption } from "./types";


export const GENDER_OPTIONS: Array<{
  value: GenderOption;
  label: string;
}> = [
  { value: 'Men', label: 'муж' },
  { value: 'Women', label: 'жен' },
];


export const DEFAULT_GENDER: GenderOption = 'Men';


export const SIZES = {
  FONT_SIZES: {
    LABEL: 16,
    BUTTON: 14,
  },
  PADDINGS: {
    BUTTON_VERTICAL: 6,
    BUTTON_HORIZONTAL: 12,
    MARGINS: {
      LABEL_RIGHT: 10,
      BUTTON_RIGHT: 8,
    },
  },
  BORDER_RADIUS: 5,
};


export const COLORS = {
  LABEL: '#000',
  BUTTON_DEFAULT: '#E6E6E6',
  BUTTON_SELECTED: '#8097F0',
  TEXT_DEFAULT: '#8097F0',
  TEXT_SELECTED: '#fff',
};