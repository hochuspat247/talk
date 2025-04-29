// src/components/ToggleSwitch/types.ts
export type TabValue = 'master' | 'client';

export interface ToggleSwitchProps {
  /** Callback для изменения активной вкладки */
  onChange: (value: TabValue) => void;
  /** Начальное значение */
  initialValue?: TabValue;
}