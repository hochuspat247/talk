
import { Colors } from '@constants/Colors';
import { ColorScheme } from './types';

interface WaveColors {
  orange: string;
  yellow: string;
}

export const COLOR_SCHEMES: Record<ColorScheme, WaveColors> = {
  default: {
    orange: Colors.waveOrange, 
    yellow: Colors.waveYellow, 
  },
  alternate: {
    orange: Colors.waveBlue, 
    yellow: Colors.wavePink,  
  },
};