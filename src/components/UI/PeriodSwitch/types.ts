import { StyleProp, ViewStyle } from 'react-native';

export type PeriodType = 'today' | 'week' | 'month';

export interface PeriodConfig {
  label: string;
  value: PeriodType;
}

export interface PeriodSwitchProps {
  
  selectedPeriod: PeriodType;

  
  onPeriodChange: (period: PeriodType) => void;

  
  style?: StyleProp<ViewStyle>;
}