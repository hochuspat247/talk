import { GenderOption } from './types';







export const handleOptionPress = (
  option: GenderOption,
  setSelectedOption: React.Dispatch<React.SetStateAction<GenderOption>>,
  onChange: (value: GenderOption) => void
): void => {
  setSelectedOption(option);
  onChange(option);
};