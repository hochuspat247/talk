import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styled';

interface InfoRowProps {
  timeRange: string;
  location: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ timeRange, location }) => (
  <View style={styles.infoRow}>
    <Text style={styles.timeText}>{timeRange}</Text>
    <View style={styles.locationWrapper}>
      <MaterialIcons name="location-on" size={16} color="#999" />
      <Text style={styles.locationText} numberOfLines={0}>
        {location}
      </Text>
    </View>
  </View>
);

export default InfoRow;