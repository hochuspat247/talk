import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});

export default BookingsScreen;