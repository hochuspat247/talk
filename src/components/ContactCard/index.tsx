import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styled';

interface ContactCardProps {
  photo?: string; // URL или путь к фото контакта (опционально)
  name: string; // Имя контакта
  phone: string; // Номер телефона
  onAddPress: () => void; // Обработчик нажатия на кнопку добавления
  isSelected: boolean; // Флаг, выбран ли пользователь
  isDisabled: boolean; // Флаг, отключена ли кнопка (для других карточек)
}

const ContactCard: React.FC<ContactCardProps> = ({ photo, name, phone, onAddPress, isSelected, isDisabled }) => {
  return (
    <View style={styles.container}>
      <Image
        source={photo ? { uri: photo } : require('../../../assets/images/default-avatar.png')} // Используем дефолтное фото, если photo не передано
        style={styles.photo}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, isDisabled && !isSelected ? styles.addButtonDisabled : null]}
        onPress={onAddPress}
        disabled={isDisabled && !isSelected}
      >
        <Ionicons
          name={isSelected ? 'checkmark' : 'add'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContactCard;