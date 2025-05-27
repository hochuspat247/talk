import React, { useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import Screen from '@components/Layout/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';
import MapWebView from '@components/Layout/MapWebView';
import Button from '@components/UI/Button'; 
import styles from './styled';
import { Location } from './types';

// Тип для навигации
type NavigationProp = NativeStackNavigationProp<ClientStackParamList, 'MapScreen'>;

// Интерфейс для пропсов MapButton
interface MapButtonProps {
  address: string;
  onPress: () => void;
}

// Компонент для отображения адреса и кнопки
const MapButton: React.FC<MapButtonProps> = ({ address, onPress }) => (
  <View style={styles.buttonContainer}>
    <Text style={styles.addressText}>{address || 'Адрес не выбран'}</Text>
    <Button
      title="Добавить"
      onPress={onPress}
      variant="primary"
      showIcon={true}
      iconName="add-circle-outline"
      size="large"
    />
  </View>
);

// Основной компонент экрана карты
const MapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Обработчик нажатия кнопки "Добавить"
  const handleAdd = () => {
    if (selectedLocation) {
      navigation.navigate('NewBooking', { result: selectedLocation });
    } else {
      setError('Выберите местоположение перед добавлением');
    }
  };

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Отображение карты */}
          <MapWebView
            setSelectedLocation={setSelectedLocation}
            setLoading={setLoading}
            setError={setError}
          />
          {/* Индикатор загрузки */}
          {loading && (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
          )}
          {/* Сообщение об ошибке */}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          {/* Кнопка с адресом */}
          {selectedLocation && !error && !loading && (
            <MapButton
              address={selectedLocation.address}
              onPress={handleAdd}
            />
          )}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default MapScreen;