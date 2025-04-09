import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Button from '@components/Button';
import Screen from '@components/Screen';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
  ProfileOptions: undefined;
  Register: undefined;
  AccountCreated: undefined;
};

type AccountCreatedScreenProps = StackScreenProps<RootStackParamList, 'AccountCreated'>;

const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ navigation }) => {
  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <Screen noPaddingTop={true}>
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/icons/check-icon.png')}
          style={styles.checkIcon}
        />
        <Text style={styles.successText}>Аккаунт создан!</Text>

        <View  style={styles.buttonContainer}>
          <View style={{ width: '100%' }}>
            <Button
              title="На главную"
              onPress={handleGoHome}
              variant="primary"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  successText: {
    fontSize: 22,
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 1,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default AccountCreatedScreen;