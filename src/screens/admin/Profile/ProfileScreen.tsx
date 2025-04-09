import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Screen from '@components/Screen';
import BottomNavigator from '@components/BottomNavigator';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
  ProfileOptions: undefined;
  Register: { isAdmin?: boolean };
  AccountCreated: undefined;
};

type ProfileOptionsScreenProps = StackScreenProps<RootStackParamList, 'ProfileOptions'>;

const ProfileOptionsScreen: React.FC<ProfileOptionsScreenProps> = ({ navigation }) => {
  const user = {
    name: 'Иванов Иван',
  };

  const handleMyDataPress = () => {
    console.log('Переход на экран "Мои данные"');
    navigation.navigate('ProfileOptions');
  };

  const handleAddFriendPress = () => {
    console.log('Переход на экран "Добавить админа"');
    navigation.navigate('Register', { isAdmin: true });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen noPaddingTop={true}>
        <View style={styles.container}>


          <View style={styles.profileContainer}>
            <Image
              source={require('../../../../assets/images/default-avatar.png')}
              style={styles.profilePhoto}
            />
            <Text style={styles.profileName}>{user.name}</Text>
          </View>

          <TouchableOpacity style={styles.option} onPress={handleMyDataPress}>
            <Text style={styles.optionText}>Мои данные</Text>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleAddFriendPress}>
            <Text style={styles.optionText}>Добавить админа</Text>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </Screen>
      <BottomNavigator activeTab="Profile" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 23,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ProfileOptionsScreen;