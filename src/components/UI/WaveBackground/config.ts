// src/components/WavesBackground/config.ts
import { Colors } from '@constants/Colors';
import { ColorScheme } from './types';

interface WaveColors {
  orange: string;
  yellow: string;
}

export const COLOR_SCHEMES: Record<ColorScheme, WaveColors> = {
  default: {
    orange: Colors.waveOrange, // #FF9F69
    yellow: Colors.waveYellow, // #FFD150
  },
  alternate: {
    orange: Colors.waveBlue, // #8097F0
    yellow: Colors.wavePink,  // #F090F1
  },
};