export const AVATAR_SIZE = 110;
export const EDIT_ICON_SIZE = 30;
export const DEFAULT_AVATAR = require('@assets/images/default-avatar.png');

export const IMAGE_PICKER_CONFIG: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

export const ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Необходимо разрешение для доступа к галерее',
  GENERIC_ERROR: 'Произошла ошибка при выборе изображения',
};