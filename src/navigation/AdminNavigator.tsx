import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminHomeScreen } from '@screens/admin/AdminHomeScreen';
import { ManageBookings } from '@screens/admin/ManageBookings';

const Stack = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="ManageBookings" component={ManageBookings} />
    </Stack.Navigator>
  );
};