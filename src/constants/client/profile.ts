  import { InputVariant } from '@components/UI/Input/types'; 
  import { FormState } from '@screens/Client/Profile/ProfileSettings/types';

  export const PROFILE_DATA = {
    NAME: 'Юлия Ноготкова',
    RATING: 5.0,
    PHONE_NUMBER: '+7 (999) 909 09 09',
  };
  
  export const ACTIVE_TAB = 'Profile';

  export const INITIAL_FORM_STATE: FormState = {
    selectedImage: null,
    selectedGender: 'Men',
    selectedExperience: 'LessThan1Year',
    clientFilters: {
      men: false,
      women: false,
      children: false,
    },
    fullName: '',
    phoneNumber: '',
    email: '',
    description: '',
  };
  
  export const INPUT_PLACEHOLDERS = {
    FULL_NAME: 'Имя и фамилия',
    PHONE_NUMBER: 'Номер телефона',
    EMAIL: 'Электронная почта',
    DESCRIPTION: 'О себе',
  };
  
  export const INPUT_VARIANTS: Record<'FULL_NAME' | 'PHONE' | 'EMAIL' | 'DESCRIPTION', InputVariant> = {
    FULL_NAME: 'user',
    PHONE: 'phone',
    EMAIL: 'email',
    DESCRIPTION: 'description',
  };
  
  export const SIZES = {
    FONT_SIZES: {
      LABEL: 16,
    },
    MARGINS: {
      COMPONENT_BOTTOM: 15,
    },
  };
  
  export const COLORS = {
    LABEL: '#000',
  };