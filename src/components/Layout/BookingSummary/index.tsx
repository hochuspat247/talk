import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

interface BookingSummaryProps {
  date: string; // Например, "Сб, 17.12"
  guests: number; // Количество гостей
  price: number; // Стоимость в рублях
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ date, guests, price }) => {
  const { width } = Dimensions.get('window');
  const [infoFontSize, setInfoFontSize] = useState(14); // Начальный размер шрифта для текстов справа
  const minFontSize = 8; // Минимальный размер шрифта для текстов справа

  // Фиксированный размер шрифта для даты
  const dateFontSize = 20;

  // Проверяем ширину при изменении пропсов или размера экрана
  useEffect(() => {
    const availableWidth = width - 32; // Учитываем marginHorizontal: 16 с каждой стороны

    // Примерная ширина текста даты (фиксированная)
    const dateTextWidth = date.length * (dateFontSize / 2);

    // Примерная ширина текста справа
    const rightTextWidth =
      (('Кол-во чел: ' + guests).length + ('Плата выручки: ' + price.toLocaleString() + ' ₽').length) *
      (infoFontSize / 2);

    // Общая ширина
    const totalWidth = dateTextWidth + rightTextWidth + 50; // 50 — запас на margin и padding

    console.log(`Available Width: ${availableWidth}, Total Width: ${totalWidth}, Info Font Size: ${infoFontSize}`);

    if (totalWidth > availableWidth) {
      // Уменьшаем только размер шрифта текстов справа
      const newFontSize = Math.max(minFontSize, infoFontSize - 1);
      console.log(`Reducing infoFontSize to: ${newFontSize}`);
      setInfoFontSize(newFontSize);
    } else if (totalWidth < availableWidth - 50 && infoFontSize < 14) {
      // Увеличиваем размер шрифта, если есть место, но не больше начального размера (14)
      const newFontSize = Math.min(14, infoFontSize + 1);
      console.log(`Increasing infoFontSize to: ${newFontSize}`);
      setInfoFontSize(newFontSize);
    }
  }, [date, guests, price, infoFontSize, width]);

  return (
    <View style={styles.container}>
      {/* Блок с датой */}
      <Text style={[styles.dateText, { fontSize: dateFontSize }]} numberOfLines={1} ellipsizeMode="tail">
        {date}
      </Text>

      {/* Блок "Кол-во чел.: 4" */}
      <View style={styles.infoBlock}>
        <Text style={[styles.infoLabel, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          Кол-во чел:
        </Text>
        <Text style={[styles.infoValue, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          {guests}
        </Text>
      </View>

      {/* Блок "Плата выручки: 6 000 ₽" */}
      <View style={styles.infoBlock}>
        <Text style={[styles.infoLabel, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          Плата выручки:
        </Text>
        <Text style={[styles.infoValue, { fontSize: infoFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          {price.toLocaleString()} ₽
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontFamily: FONTS.MANROPE_EXTRA_BOLD,
    color: '#8097F0',
    marginRight: 10,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  infoLabel: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    color: '#37393F66',
    marginRight: 3,
  },
  infoValue: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    color: '#37393F66',
  },
});

export default BookingSummary;