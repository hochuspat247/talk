import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';

export type GenderOption = 'Men' | 'Women';

export type ExperienceOption =
  | 'LessThan1Year'
  | '1To3Years'
  | '3To5Years'
  | '5To10Years'
  | 'MoreThan10Years';

export interface ClientFilters {
  men: boolean;
  women: boolean;
  children: boolean;
}

export type ProfileSettingsScreenProps = StackScreenProps<ClientStackParamList, 'ProfileSettings'>;

export interface FormState {
  selectedImage: string | null;
  selectedGender: GenderOption;
  selectedExperience: ExperienceOption;
  clientFilters: ClientFilters;
  fullName: string;
  phoneNumber: string;
  email: string;
  description: string;
}