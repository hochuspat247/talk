import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, } from 'react-native';
import Input from '@components/Input';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import Screen from '@components/Screen';
import BottomNavigator from '@components/BottomNavigator';

// Определяем типы для параметров навигации
type RootStackParamList = {
  Home: undefined;
  Bookings: { court: string; date: string; time: string; status: 'active' | 'canceled'; fromMyBookings?: boolean; selectedSlots?: string[] };
  BookingSuccess: { court: string; date: string; selectedSlots: string[]; status: 'success' | 'error' };
  MyBookings: undefined;
  Profile: undefined;
};

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Иван',
    lastName: 'Иванов',
    birthDate: '30.07.2003',
    phone: '+7 891 999-99-22',
    email: 'ivdje@gmail.com',
    selectedImage: null as string | null,
  });

  const [tempData, setTempData] = useState({ ...profileData }); // Временные данные для редактирования
  const [editingField, setEditingField] = useState<string | null>(null); // Поле, которое редактируется
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Ошибки валидации

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Необходимо разрешение для доступа к галерее');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData({ ...profileData, selectedImage: result.assets[0].uri });
      setTempData({ ...tempData, selectedImage: result.assets[0].uri });
    }
  };

  const handleFieldPress = (field: string) => {
    setEditingField(field);
  };

  const validateField = (field: string, value: string) => {
    const newErrors: { [key: string]: string } = { ...errors };

    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'Введите имя';
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(value)) {
          newErrors.firstName = 'Имя должно содержать только буквы';
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Введите фамилию';
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(value)) {
          newErrors.lastName = 'Фамилия должна содержать только буквы';
        } else {
          delete newErrors.lastName;
        }
        break;
      case 'birthDate':
        const [day, month, year] = value.split('.');
        if (!day || !month || !year || parseInt(day) > 31 || parseInt(month) > 12 || value.length !== 10) {
          newErrors.birthDate = 'Неверный формат даты (ДД.ММ.ГГГГ)';
        } else {
          delete newErrors.birthDate;
        }
        break;
      case 'phone':
        if (!value.match(/^\+7 \d{3} \(\d{3}\) \d{2}-\d{2}$/)) {
          newErrors.phone = 'Неверный формат телефона (+7 XXX (XXX) XX-XX)';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'email':
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          newErrors.email = 'Неверный формат email';
        } else {
          delete newErrors.email;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatBirthDate = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 2 || i === 4) formatted += '.';
      formatted += cleaned[i];
    }
    setTempData({ ...tempData, birthDate: formatted });
    validateField('birthDate', formatted);
    return formatted;
  };

  const formatPhoneNumber = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('7')) cleaned = cleaned.substring(1);
    if (cleaned.startsWith('8')) cleaned = cleaned.substring(1);
    if (cleaned.length > 10) cleaned = cleaned.substring(0, 10);

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) {
      setTempData({ ...tempData, phone: '+7 ' });
      validateField('phone', '+7 ');
      return '+7 ';
    }

    let formatted = '+7';
    if (match[1]) formatted += ' ' + match[1];
    if (match[2]) formatted += ` (${match[2]}`;
    if (match[2] && match[2].length === 3) formatted += ')';
    if (match[3]) formatted += ` ${match[3]}`;
    if (match[4]) formatted += `-${match[4]}`;

    setTempData({ ...tempData, phone: formatted });
    validateField('phone', formatted);
    return formatted;
  };

  const handleSave = (field: string) => {
    if (validateField(field, tempData[field])) {
      setProfileData({ ...tempData });
      setEditingField(null);
    }
  };

  const handleChangeText = (field: string, text: string) => {
    if (field === 'birthDate') {
      formatBirthDate(text);
    } else if (field === 'phone') {
      formatPhoneNumber(text);
    } else {
      setTempData({ ...tempData, [field]: text });
      validateField(field, text);
    }
  };

  return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
    >
    <Screen noPaddingTop={true}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
            {profileData.selectedImage ? (
              <Image source={{ uri: profileData.selectedImage }} style={styles.selectedImage} />
            ) : (
              <Image
                source={require('../../../../assets/images/default-avatar.png')}
                style={styles.selectedImage}
              />
            )}
            <View style={styles.editIcon}>
              <Ionicons name="pencil" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <Text style={styles.label}>ИМЯ</Text>
          <TouchableOpacity onPress={() => handleFieldPress('firstName')}>
            <Input
              value={tempData.firstName}
              onChangeText={(text) => handleChangeText('firstName', text)}
              placeholder="Имя"
              editable={editingField === 'firstName'}
              isWhiteBackground={true}
              isEditing={editingField === 'firstName'}
              onSave={() => handleSave('firstName')}
              hasError={!!errors.firstName}
              errorText={errors.firstName}
            />
          </TouchableOpacity>

          <Text style={styles.label}>ФАМИЛИЯ</Text>
          <TouchableOpacity onPress={() => handleFieldPress('lastName')}>
            <Input
              value={tempData.lastName}
              onChangeText={(text) => handleChangeText('lastName', text)}
              placeholder="Фамилия"
              editable={editingField === 'lastName'}
              isWhiteBackground={true}
              isEditing={editingField === 'lastName'}
              onSave={() => handleSave('lastName')}
              hasError={!!errors.lastName}
              errorText={errors.lastName}
            />
          </TouchableOpacity>

          <Text style={styles.label}>ДАТА РОЖДЕНИЯ</Text>
          <TouchableOpacity onPress={() => handleFieldPress('birthDate')}>
            <Input
              value={tempData.birthDate}
              onChangeText={(text) => handleChangeText('birthDate', text)}
              placeholder="ДД.ММ.ГГГГ"
              keyboardType="numeric"
              editable={editingField === 'birthDate'}
              isWhiteBackground={true}
              isEditing={editingField === 'birthDate'}
              onSave={() => handleSave('birthDate')}
              hasError={!!errors.birthDate}
              errorText={errors.birthDate}
            />
          </TouchableOpacity>

          <Text style={styles.label}>НОМЕР ТЕЛЕФОНА</Text>
          <TouchableOpacity onPress={() => handleFieldPress('phone')}>
            <Input
              value={tempData.phone}
              onChangeText={(text) => handleChangeText('phone', text)}
              placeholder="+7 XXX (XXX) XX-XX"
              keyboardType="phone-pad"
              editable={editingField === 'phone'}
              isWhiteBackground={true}
              isEditing={editingField === 'phone'}
              onSave={() => handleSave('phone')}
              hasError={!!errors.phone}
              errorText={errors.phone}
            />
          </TouchableOpacity>

          <Text style={styles.label}>ПОЧТА</Text>
          <TouchableOpacity onPress={() => handleFieldPress('email')}>
            <Input
              value={tempData.email}
              onChangeText={(text) => handleChangeText('email', text)}
              placeholder="Email"
              keyboardType="email-address"
              editable={editingField === 'email'}
              isWhiteBackground={true}
              isEditing={editingField === 'email'}
              onSave={() => handleSave('email')}
              hasError={!!errors.email}
              errorText={errors.email}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
    <BottomNavigator activeTab="Profile" />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingVertical: 30,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 100,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 20, // Учитываем отступы от краев
  },
});

export default ProfileScreen;