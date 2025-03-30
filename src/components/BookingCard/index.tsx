import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styled';
import { Colors } from '@constants/Colors'; // Импортируем Colors

interface BookingCardProps {
  court: string; // Номер корта
  date: string; // Дата бронирования
  time: string; // Время бронирования
  status: 'active' | 'canceled'; // Состояние бронирования
}

const BookingCard: React.FC<BookingCardProps> = ({ court, date, time, status }) => {
  return (
    <View style={styles.container}>
      {/* Верхний блок: дата и время */}
      <View
        style={[
          styles.topBlock,
          { backgroundColor: status === 'active' ? Colors.primary : Colors.error_card }, // Динамически задаем цвет
        ]}
      >
        <View style={styles.row}>
          <View>
            <Text style={styles.date}>дата</Text>
            <Text style={styles.dateValue}>{date}</Text>
          </View>
          <View>
            <Text style={styles.time}>время</Text>
            <Text style={styles.timeValue}>{time}</Text>
          </View>
        </View>
      </View>

      {/* Нижний блок: место и иконка */}
      <View style={styles.bottomBlock}>
        <View style={styles.row}>
          <View>
            <Text style={styles.court}>место</Text>
            <Text style={styles.courtValue}>{court}</Text>
          </View>
          <Image
            source={require('../../../assets/images/rackets.png')} // Укажите путь к изображению с ракетками
            style={styles.racketsIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default BookingCard;