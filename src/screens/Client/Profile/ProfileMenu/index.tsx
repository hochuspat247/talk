import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '@components/Layout/Screen';
import ProfileHeader from '@components/UI/ProfileHeader';
import ProfileMenuList from '@components/UI/ProfileMenuList';
import BottomNavigator from '@components/UI/BottomNavigator';
import { NavigationProp } from './types';
import { styles } from './styled';
import { PROFILE_DATA, ACTIVE_TAB } from './constants';
import { handleLogout } from './utils';







const ProfileMenu: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

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
        <ProfileMenuList onLogout={() => handleLogout(navigation)} />
      </Screen>
      <View style={styles.navWrapper}>
        <BottomNavigator activeTab={ACTIVE_TAB} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileMenu;