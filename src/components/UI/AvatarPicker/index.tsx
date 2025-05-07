import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { AvatarPickerProps } from './types';
import { styles } from './styled';
import { DEFAULT_AVATAR } from './constants';
import { pickImage } from './utils';








const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedImage, onImageChange }) => {
  const handlePickImage = () => pickImage(onImageChange);

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handlePickImage}>
        <View style={styles.avatarContainer}>
          <Image
            source={selectedImage ? { uri: selectedImage } : DEFAULT_AVATAR}
            style={styles.selectedImage}
          />
          <View style={styles.editIcon}>
            <Octicons name="pencil" size={16} color="#8097F0" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;