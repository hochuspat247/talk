import { MenuItem } from "./types";


export const MENU_ITEMS: MenuItem[] = [
  { icon: 'calendar-outline', label: 'Режим работы', screen: 'WorkSchedule' },
  { icon: 'briefcase-outline', label: 'Услуги', screen: 'Services' },
  { icon: 'business-outline', label: 'Банковские реквизиты', screen: 'BankDetails' },
];


export const SIZES = {
  ICON: 24,
  ARROW_ICON: 20,
  FONT_SIZE: 16,
  PADDINGS: {
    VERTICAL: 15,
    HORIZONTAL: 20,
    MARGINS: {
      ICON_RIGHT: 15,
      ARROW_LEFT: 10,
      MENU_TOP: 20,
      LOGOUT_TOP: 10,
    },
  },
};


export const COLORS = {
  ICON: '#000',
  TEXT: '#000',
  ARROW: '#666',
  LOGOUT_ICON: '#FF0000',
  LOGOUT_TEXT: '#FF0000',
  BORDER: '#f0f0f0',
};