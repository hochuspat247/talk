export type ExperienceOption =
  | 'LessThan1Year'
  | '1To3Years'
  | '3To5Years'
  | '5To10Years'
  | 'MoreThan10Years';

export interface ExperienceControlProps {
  
  onChange: (value: ExperienceOption) => void;
  
  initialValue?: ExperienceOption;
}