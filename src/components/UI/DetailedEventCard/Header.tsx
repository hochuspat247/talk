import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styled';

interface HeaderProps {
  title: string;
  status: string;
  price: string;
  statusBadgeStyle: any;
  statusTextStyle: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  status,
  price,
  statusBadgeStyle,
  statusTextStyle,
}) => (
  <View style={styles.header}>
    <Text style={styles.title} numberOfLines={0}>
      {title}
    </Text>
    <View style={styles.badges}>
      <View style={[styles.statusBadge, statusBadgeStyle]}>
        <Text style={[styles.statusText, statusTextStyle]}>{status}</Text>
      </View>
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  </View>
);

export default Header;