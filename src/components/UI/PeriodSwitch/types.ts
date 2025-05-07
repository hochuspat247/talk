import { StyleProp, ViewStyle } from 'react-native';

export type PeriodType = 'today' | 'week' | 'month';

export interface PeriodConfig {
  label: string;
  value: PeriodType;
}

export interface PeriodSwitchProps {
  /** Текущий выбранный период. */
  selectedPeriod: PeriodType;

  /** Обработчик изменения периода. */
  onPeriodChange: (period: PeriodType) => void;

  /** Дополнительные стили контейнера (опционально). */
  style?: StyleProp<ViewStyle>;
}