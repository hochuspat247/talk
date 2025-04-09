import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styled';
import { Colors } from '@constants/Colors';

interface BookingCardProps {
  court: string; // Номер корта
  date: string; // Дата бронирования
  time: string; // Время бронирования
  status: 'active' | 'canceled'; // Состояние бронирования
  userName?: string; // Имя покупателя (для администратора)
  isAdmin?: boolean; // Флаг, является ли пользователь администратором
}

const BookingCard: React.FC<BookingCardProps> = ({ court, date, time, status, userName, isAdmin = false }) => {
  return (
    <View style={styles.container}>
      {/* Верхний блок: дата и время */}
      <View
        style={[
          styles.topBlock,
          { backgroundColor: status === 'active' ? Colors.primary : Colors.error_card },
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

      {/* Нижний блок: место и информация о покупателе (для админа) или иконка (для пользователя) */}
      <View style={styles.bottomBlock}>
        <View style={styles.row}>
          <View>
            <Text style={styles.court}>место</Text>
            <Text style={styles.courtValue}>{court}</Text>
          </View>
          {isAdmin && userName ? (
            <View>
              <Text style={styles.buyerLabel}>покупатель</Text>
              <Text style={styles.buyerName}>{userName}</Text>
            </View>
          ) : (
            <Image
              source={require('../../../assets/images/rackets.png')}
              style={styles.racketsIcon}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default BookingCard;