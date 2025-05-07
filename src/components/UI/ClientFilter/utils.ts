import { FilterState } from './types';








export const toggleFilter = (
  key: keyof FilterState,
  currentFilters: FilterState,
  onChange: (filters: FilterState) => void
): FilterState => {
  const newFilters = { ...currentFilters, [key]: !currentFilters[key] };
  onChange(newFilters);
  return newFilters;
};