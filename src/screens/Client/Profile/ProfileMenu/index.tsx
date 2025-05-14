import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '@components/Layout/Screen';
import ProfileHeader from '@components/UI/ProfileHeader';
import ProfileMenuList from '@components/UI/ProfileMenuList';
import { NavigationProp } from './types';
import { styles } from './styled';
import { PROFILE_DATA } from './constants';
import { handleLogout } from './utils';

interface ProfileMenuProps {
  onLogout: () => Promise<void>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {
  const navigation = useNavigation<NavigationProp>();

  console.log('ProfileMenu: Component initialized');
  console.log('ProfileMenu: Rendering with onLogout:', onLogout);
  console.log('ProfileMenu: Styles:', styles);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Screen>
        <ProfileHeader
          name={PROFILE_DATA.NAME}
          rating={PROFILE_DATA.RATING}
          phoneNumber={PROFILE_DATA.PHONE_NUMBER}
        />
        <ProfileMenuList
          onLogout={() => {
            console.log('ProfileMenu: Calling handleLogout');
            handleLogout(navigation, onLogout);
          }}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default ProfileMenu;