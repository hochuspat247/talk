import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styled';

interface ContactCardProps {
  photo: string; // URL или путь к фото контакта
  name: string; // Имя контакта
  phone: string; // Номер телефона
  onAddPress: () => void; // Обработчик нажатия на кнопку добавления
}

const ContactCard: React.FC<ContactCardProps> = ({ photo, name, phone, onAddPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo }} // URL фото
        style={styles.photo}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ContactCard;