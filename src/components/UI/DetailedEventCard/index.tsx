// DetailedEventCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface DetailedEventCardProps {
  title: string;
  timeRange: string;       // например "15:00–16:00"
  location: string;        // например `"BEAUTY LAB STORE", Лубянский пр., стр. 1`
  status: 'Активно' | 'Подтверждено' | string;
  price: string;           // например "1 500 ₽"
}

const DetailedEventCard: React.FC<DetailedEventCardProps> = ({
  title,
  timeRange,
  location,
  status,
  price,
}) => {
  // выбор цвета бейджа статуса
  const isActive = status === 'Активно';
  const statusBadgeStyle = isActive
    ? styles.statusBadgeActive
    : styles.statusBadgeConfirmed;
  const statusTextStyle = isActive
    ? styles.statusTextActive
    : styles.statusTextConfirmed;

  return (
    <View style={styles.card}>
      {/* Шапка: заголовок + бейджи */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={0}>
          {title}
        </Text>
        <View style={styles.badges}>
          <View style={[styles.statusBadge, statusBadgeStyle]}>
            <Text style={[styles.statusText, statusTextStyle]}>
              {status}
            </Text>
          </View>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{price}</Text>
          </View>
        </View>
      </View>

      {/* Время и локация */}
      <View style={styles.infoRow}>
        <Text style={styles.timeText}>{timeRange}</Text>
        <View style={styles.locationWrapper}>
          <MaterialIcons name="location-on" size={16} color="#999" />
          <Text style={styles.locationText} numberOfLines={0}>
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DetailedEventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    flexWrap: 'wrap',
    marginRight: 8,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // общий стиль для всех бейджей статуса
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  // активный — синий фон
  statusBadgeActive: {
    backgroundColor: '#E0F0FF',
  },
  statusTextActive: {
    color: '#007AFF',
  },
  // подтверждён — зелёный фон
  statusBadgeConfirmed: {
    backgroundColor: '#E6F7E6',
  },
  statusTextConfirmed: {
    color: '#1CB37C',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: '#E6F7E6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1CB37C',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#333',
    marginRight: 8,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  locationText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 4,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
