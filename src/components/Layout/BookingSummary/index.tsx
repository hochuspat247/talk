import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styled';
import { BookingSummaryProps } from './types';
import { calculateInfoFontSize, formatPrice } from './utils';








const BookingSummary: React.FC<BookingSummaryProps> = ({ date, guests, price }) => {
  const [infoFontSize, setInfoFontSize] = useState(14);

  useEffect(() => {
    const newFontSize = calculateInfoFontSize({ date, guests, price, currentFontSize: infoFontSize });
    setInfoFontSize(newFontSize);
  }, [date, guests, price, infoFontSize]);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
        {date}
      </Text>
      <View style={styles.infoBlock}>
        <Text style={[styles.infoLabel, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          Кол-во чел:
        </Text>
        <Text style={[styles.infoValue, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          {guests}
        </Text>
      </View>
      <View style={styles.infoBlock}>
        <Text style={[styles.infoLabel, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          Плата выручки:
        </Text>
        <Text style={[styles.infoValue, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          {formatPrice(price)}
        </Text>
      </View>
    </View>
  );
};

export default BookingSummary;