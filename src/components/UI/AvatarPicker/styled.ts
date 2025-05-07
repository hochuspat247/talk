import { StyleSheet } from 'react-native';
import { AVATAR_SIZE, EDIT_ICON_SIZE } from './constants';

export const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: AVATAR_SIZE / 2 + 5, 
    padding: 5,
  },
  selectedImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2, 
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: EDIT_ICON_SIZE / 2,
    width: EDIT_ICON_SIZE,
    height: EDIT_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});