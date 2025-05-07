export type GenderOption = 'Men' | 'Women';

export interface SegmentedControlProps {
  
  onChange: (value: GenderOption) => void;
  
  initialValue?: GenderOption;
}