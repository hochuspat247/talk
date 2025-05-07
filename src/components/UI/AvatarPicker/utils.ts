import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { ERROR_MESSAGES, IMAGE_PICKER_CONFIG } from './constants';

export const pickImage = async (onImageChange: (uri: string) => void): Promise<void> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', ERROR_MESSAGES.PERMISSION_DENIED);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_CONFIG);
    if (!result.canceled && result.assets?.[0]?.uri) {
      onImageChange(result.assets[0].uri);
    }
  } catch (error) {
    Alert.alert('Ошибка', ERROR_MESSAGES.GENERIC_ERROR);
    console.error('Image picking error:', error);
  }
};