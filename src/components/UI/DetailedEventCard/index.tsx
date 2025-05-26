import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DetailedEventCardProps } from './types';
import { styles } from './styled';
import { getStatusStyles } from './utils';
import Header from './Header';
import InfoRow from './InfoRow';

const DetailedEventCard: React.FC<DetailedEventCardProps> = ({
  title,
  timeRange,
  location,
  status,
  price,
}) => {
  const { statusBadgeStyle, statusTextStyle } = getStatusStyles(status);

  return (
    <View style={styles.card}>
      <Header
        title={title}
        status={status}
        price={price}
        statusBadgeStyle={statusBadgeStyle}
        statusTextStyle={statusTextStyle}
      />
      <InfoRow timeRange={timeRange} location={location} />
    </View>
  );
};

export default DetailedEventCard;