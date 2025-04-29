// src/components/WavesBackground/types.ts
export type ColorScheme = 'default' | 'alternate';

export interface WavesBackgroundProps {
  /** Цветовая схема волн */
  colorScheme?: ColorScheme;
}