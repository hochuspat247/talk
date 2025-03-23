import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@components'; 

const AdminHomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home</Text>
      <Button
        title="Manage Bookings"
        onPress={() => navigation.navigate('ManageBookings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default AdminHomeScreen;