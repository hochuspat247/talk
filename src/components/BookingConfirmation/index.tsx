import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styled';

interface BookingConfirmationProps {
  court: string; // Номер корта
  date: string; // Дата бронирования
  name: string; // Фамилия и имя
  time: string; // Время бронирования
  price: string; // Стоимость
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ court, date, name, time, price }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/court-bg.png')} // Укажите путь к вашему изображению
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>место</Text>
            <Text style={styles.value}>{court}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>дата</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>фамилия и имя</Text>
            <Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">
              {name}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>время</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer_small}>
        <View style={styles.priceRow}>
          <Text style={styles.value}>Cтоимость</Text>
          <Text style={styles.value}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

export default BookingConfirmation;