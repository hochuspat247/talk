

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@screens/Client/Home';
import ProfileMenu from '@screens/Client/Profile/ProfileMenu';
import NewBookingScreen from '@screens/Client/NewBooking';
import ProfileSettingsScreen from '@screens/Client/Profile/ProfileSettings';
import MapScreen from '@screens/Client/Map'; 


export type ClientStackParamList = {
  Tabs: undefined;
  ProfileSettings: undefined;
  WorkSchedule: undefined;
  Services: undefined;
  BankDetails: undefined;
  NewBooking: undefined;
  MapScreen: { onSelectLocation?: (location: { latitude: number; longitude: number; address: string }) => void }; 
};


export type ClientTabParamList = {
  Home: undefined;
  Friends: undefined;
  Wallet: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<ClientStackParamList>();
const Tab = createBottomTabNavigator<ClientTabParamList>();

interface ClientNavigatorProps {
  onLogout: () => void;
}


const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F090F1',
    marginTop: 4,
  },
  empty: {
    width: 6,
    height: 6,
    marginTop: 4,
  },
});


const PlaceholderScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>В разработке</Text>
    </View>
  );
};


const ProfileStack: React.FC<{ onLogout: () => Promise<void> }> = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
      >
        {props => <ProfileMenu {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{ headerTitle: 'Настройки' }}
      />
    </Stack.Navigator>
  );
};


const TabNavigator: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: string;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? '#F090F1' : '#666'}
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <View style={focused ? styles.dot : styles.empty} />
        ),
        tabBarActiveTintColor: '#F090F1',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          borderTopLeftRadius: 43,
          borderTopRightRadius: 43,
          paddingVertical: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarTestID: 'home-tab' }}
      />
      <Tab.Screen
        name="Friends"
        component={PlaceholderScreen}
        options={{ tabBarTestID: 'friends-tab' }}
      />
      <Tab.Screen
        name="Wallet"
        component={PlaceholderScreen}
        options={{ tabBarTestID: 'wallet-tab' }}
      />
      <Tab.Screen
        name="Profile"
        options={{ tabBarTestID: 'profile-tab' }}
      >
        {props => <ProfileStack {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};


export const ClientNavigator: React.FC<ClientNavigatorProps> = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
      >
        {props => <TabNavigator {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="NewBooking"
        component={NewBookingScreen}
        options={{ headerTitle: 'Новая запись' }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Выбрать адрес на карте' }}
      />
    </Stack.Navigator>
  );
};

export default ClientNavigator;