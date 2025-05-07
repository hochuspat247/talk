import { Dimensions } from 'react-native';
import { BookingSummaryProps } from './types';

const { width } = Dimensions.get('window');




const MIN_FONT_SIZE = 8;




const INITIAL_FONT_SIZE = 14;











export const calculateInfoFontSize = ({
  date,
  guests,
  price,
  currentFontSize,
}: BookingSummaryProps & { currentFontSize: number }): number => {
  const availableWidth = width - 32; 
  const dateFontSize = 20;

  
  const dateTextWidth = date.length * (dateFontSize / 2);

  
  const rightTextWidth =
    (('Кол-во чел: ' + guests).length + ('Плата выручки: ' + price.toLocaleString() + ' ₽').length) *
    (currentFontSize / 2);

  
  const totalWidth = dateTextWidth + rightTextWidth + 50; 

  if (totalWidth > availableWidth) {
    return Math.max(MIN_FONT_SIZE, currentFontSize - 1);
  } else if (totalWidth < availableWidth - 50 && currentFontSize < INITIAL_FONT_SIZE) {
    return Math.min(INITIAL_FONT_SIZE, currentFontSize + 1);
  }
  return currentFontSize;
};







export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} ₽`;
};