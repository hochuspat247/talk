// variants.ts

import { TEXTS } from '@constants/Texts';
import { handleClear, handleCopy } from './utils';

type IconName = 'map-outline' | 'search-outline' | 'person-outline' | 'close-outline' | 'copy-outline' | undefined;

export const VARIANT_CONFIG: Record<string, { icon?: IconName; placeholder: string; onPress?: (value: string, onChangeText: (text: string) => void) => () => void | Promise<void> }> = {
  map: { icon: 'map-outline', placeholder: TEXTS.PLACEHOLDER_DEFAULT },
  search: { icon: 'search-outline', placeholder: TEXTS.PLACEHOLDER_DEFAULT },
  user: { icon: 'person-outline', placeholder: TEXTS.LOGIN_PHONE_PLACEHOLDER },
  userNoIcon: { icon: undefined, placeholder: TEXTS.LOGIN_PHONE_PLACEHOLDER }, // Новый вариант без иконки
  clearable: { icon: 'close-outline', placeholder: TEXTS.PLACEHOLDER_DEFAULT, onPress: handleClear },
  copyable: { icon: 'copy-outline', placeholder: TEXTS.PLACEHOLDER_DEFAULT, onPress: handleCopy },
  password: { placeholder: TEXTS.LOGIN_PASSWORD_PLACEHOLDER },
  description: { placeholder: TEXTS.PLACEHOLDER_DESCRIPTION },
  time: { placeholder: TEXTS.PLACEHOLDER_TIME },
  code: { placeholder: '' },
  phone: { icon: undefined, placeholder: TEXTS.LOGIN_PHONE_PLACEHOLDER },
  confirm: { placeholder: TEXTS.CONFIRM_PASSWORD_PLACEHOLDER },
  email: { placeholder: TEXTS.EMAIL_PLACEHOLDER },
};