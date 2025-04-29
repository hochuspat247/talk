import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '@components/UI/Input';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import Screen from '@components/Screen';
import BottomNavigator from '@components/BottomNavigator';
import { getProfile, updateProfile } from '@api/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    selectedImage: null as string | null,
  });

  const [tempData, setTempData] = useState({ ...profileData });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');

        const profile = await getProfile(Number(userId));
        const mappedProfile = {
          firstName: profile.first_name,
          lastName: profile.last_name,
          birthDate: profile.birth_date || '',
          phone: profile.phone,
          email: profile.email,
          selectedImage: profile.photo || null,
        };
        setProfileData(mappedProfile);
        setTempData(mappedProfile);
      } catch (err) {
        console.error('Ошибка загрузки профиля:', err);
        Alert.alert('Ошибка', 'Не удалось загрузить профиль');
      }
    };

    fetchProfile();
  }, []);

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
      const uri = result.assets[0].uri;
      setTempData({ ...tempData, selectedImage: uri });
      handleSave('selectedImage', uri);
    }
  };

  const handleFieldPress = (field: string) => {
    setEditingField(field);
  };

  const validateField = (field: string, value: string) => {
    const newErrors: { [key: string]: string } = { ...errors };

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[field] = `Введите ${field === 'firstName' ? 'имя' : 'фамилию'}`;
        } else if (!/^[a-zA-Zа-яА-Я]+$/.test(value)) {
          newErrors[field] = 'Только буквы';
        } else {
          delete newErrors[field];
        }
        break;
      case 'birthDate':
        const [day, month, year] = value.split('.');
        if (!day || !month || !year || parseInt(day) > 31 || parseInt(month) > 12 || value.length !== 10) {
          newErrors.birthDate = 'Неверный формат (ДД.ММ.ГГГГ)';
        } else {
          delete newErrors.birthDate;
        }
        break;
      case 'phone':
        if (!value.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/)) {
          newErrors.phone = 'Неверный формат телефона';
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
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) cleaned = cleaned.slice(1);
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    let formatted = '+7';
    if (match) {
      if (match[1]) formatted += '(' + match[1];
      if (match[1] && match[1].length === 3) formatted += ')';
      if (match[2]) formatted += match[2];
      if (match[3]) formatted += '-' + match[3];
      if (match[4]) formatted += '-' + match[4];
    }
    setTempData({ ...tempData, phone: formatted });
    validateField('phone', formatted);
    return formatted;
  };

  const handleSave = async (field: string, directValue?: string) => {
    const value = directValue ?? tempData[field];
    if (validateField(field, value)) {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');

        const apiFieldMap: Record<string, string> = {
          firstName: 'first_name',
          lastName: 'last_name',
          birthDate: 'birth_date',
          phone: 'phone',
          email: 'email',
          selectedImage: 'photo',
        };

        const payload: any = { [apiFieldMap[field]]: value };

        const updated = await updateProfile(Number(userId), payload);

        const updatedMapped = {
          firstName: updated.first_name,
          lastName: updated.last_name,
          birthDate: updated.birth_date || '',
          phone: updated.phone,
          email: updated.email,
          selectedImage: updated.photo || null,
        };

        setProfileData(updatedMapped);
        setTempData(updatedMapped);
        setEditingField(null);
      } catch (err) {
        console.error('Ошибка сохранения:', err);
        Alert.alert('Ошибка', 'Не удалось сохранить изменения');
      }
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
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Screen noPaddingTop>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
              {profileData.selectedImage ? (
                <Image source={{ uri: profileData.selectedImage }} style={styles.selectedImage} />
              ) : (
                <Image source={require('../../../../assets/images/default-avatar.png')} style={styles.selectedImage} />
              )}
              <View style={styles.editIcon}>
                <Ionicons name="pencil" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            {[
              { label: 'ИМЯ', field: 'firstName', placeholder: 'Имя' },
              { label: 'ФАМИЛИЯ', field: 'lastName', placeholder: 'Фамилия' },
              { label: 'ДАТА РОЖДЕНИЯ', field: 'birthDate', placeholder: 'ДД.ММ.ГГГГ', keyboardType: 'numeric' },
              { label: 'НОМЕР ТЕЛЕФОНА', field: 'phone', placeholder: '+7(XXX)XXX-XX-XX', keyboardType: 'phone-pad', maxLength: 16 },
              { label: 'ПОЧТА', field: 'email', placeholder: 'Email', keyboardType: 'email-address' },
            ].map(({ label, field, placeholder, keyboardType, maxLength }) => (
              <React.Fragment key={field}>
                <Text style={styles.label}>{label}</Text>
                <TouchableOpacity onPress={() => handleFieldPress(field)}>
                  <Input
                    value={tempData[field]}
                    onChangeText={(text) => handleChangeText(field, text)}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    editable={editingField === field}
                    isWhiteBackground
                    isEditing={editingField === field}
                    onSave={() => handleSave(field)}
                    hasError={!!errors[field]}
                    errorText={errors[field]}
                  />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </Screen>
      <BottomNavigator activeTab="Profile" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  contentContainer: { paddingVertical: 30 },
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
    marginLeft: 20,
  },
});

export default ProfileScreen;
