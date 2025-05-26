import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styled';

interface MapButtonProps {
  address: string;
  onPress: () => void;
}

const MapButton: React.FC<MapButtonProps> = ({ address, onPress }) => (
  <View style={styles.buttonContainer}>
    <Text style={styles.addressText}>{address}</Text>
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>Добавить</Text>
    </TouchableOpacity>
  </View>
);

export default MapButton;