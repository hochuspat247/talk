import { ExperienceOption } from './types';







export const handleOptionPress = (
  option: ExperienceOption,
  setSelectedOption: React.Dispatch<React.SetStateAction<ExperienceOption>>,
  onChange: (value: ExperienceOption) => void
): void => {
  setSelectedOption(option);
  onChange(option);
};