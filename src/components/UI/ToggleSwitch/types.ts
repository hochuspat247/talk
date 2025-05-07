
export type TabValue = 'master' | 'client';

export interface ToggleSwitchProps {
  
  onChange: (value: TabValue) => void;
  
  initialValue?: TabValue;
}