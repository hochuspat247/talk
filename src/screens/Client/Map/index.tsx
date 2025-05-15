// MapScreen.tsx

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Screen from '@components/Layout/Screen';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';
import axios from 'axios';

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E3E3E3',
  },
  addButton: {
    backgroundColor: '#A8BFFA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Типизация для navigation
type NavigationProp = NativeStackNavigationProp<ClientStackParamList, 'MapScreen'>;

const MapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const YANDEX_API_KEY = '59f6a7a4-48c1-4a80-b6fa-56f91a40d14c';

  // Функция для геокодирования через Nominatim
  const geocodeWithNominatim = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'MyBookingApp/1.0 (your.email@example.com)', // Укажите ваш email
          },
        }
      );
      console.log("Ответ Nominatim:", response.data);
      return response.data.display_name || 'Адрес не найден';
    } catch (err) {
      console.error('Ошибка геокодирования через Nominatim:', err);
      return `Координаты: ${latitude}, ${longitude}`;
    }
  };

  // HTML-код для загрузки карты через WebView
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body, #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU"></script>
        <script>
          console.log("Загрузка API Яндекс.Карт...");
          try {
            ymaps.ready(function () {
              console.log("API Яндекс.Карт успешно загружен");
              const myMap = new ymaps.Map("map", {
                center: [55.7558, 37.6173],
                zoom: 10,
                controls: ['zoomControl', 'geolocationControl'],
              });

              let selectedPlacemark;

              myMap.events.add('click', function (e) {
                console.log("Клик по карте");
                const coords = e.get('coords');
                const latitude = coords[0];
                const longitude = coords[1];

                if (selectedPlacemark) {
                  myMap.geoObjects.remove(selectedPlacemark);
                }

                selectedPlacemark = new ymaps.Placemark([latitude, longitude], {}, {
                  preset: 'islands#redDotIcon',
                });
                myMap.geoObjects.add(selectedPlacemark);

                const data = {
                  latitude: latitude,
                  longitude: longitude,
                  address: "Координаты: " + latitude + ", " + longitude,
                };
                console.log("Отправка сообщения в React Native:", data);
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
              });

              ymaps.geolocation.get().then(function (res) {
                const userLocation = res.geoObjects.position;
                if (userLocation) {
                  myMap.setCenter(userLocation, 15);
                  console.log("Местоположение пользователя:", userLocation);
                }
              }, function (err) {
                console.error("Ошибка геолокации:", err);
              });
            }, function (err) {
              console.error("Не удалось загрузить API Яндекс.Карт:", err);
              window.ReactNativeWebView.postMessage(JSON.stringify({
                error: "Не удалось загрузить Яндекс.Карты: " + (err.message || "Неизвестная ошибка")
              }));
            });
          } catch (err) {
            console.error("Глобальная ошибка в скрипте:", err);
            window.ReactNativeWebView.postMessage(JSON.stringify({
              error: "Глобальная ошибка в скрипте: " + (err.message || "Неизвестная ошибка")
            }));
          }
        </script>
      </body>
    </html>
  `;

  const handleMessage = async (event: { nativeEvent: { data: string } }) => {
    console.log("Получено сообщение из WebView:", event.nativeEvent.data);
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        // Выполняем геокодирование через Nominatim
        const address = await geocodeWithNominatim(data.latitude, data.longitude);
        setSelectedLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          address: address,
        });
        setError(null);
      }
    } catch (error) {
      console.error('Ошибка при разборе сообщения из WebView:', error);
      setError('Ошибка обработки данных с карты');
    }
  };

  const handleAdd = () => {
    if (selectedLocation) {
      console.log("Добавление адреса:", selectedLocation);
      navigation.navigate('NewBooking', { result: selectedLocation });
      
    }
  };

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {error && (
            <View style={styles.loadingContainer}>
              <Text style={{ color: 'red' }}>{error}</Text>
            </View>
          )}
          <WebView
            source={{ html: mapHtml }}
            style={{ flex: 1, opacity: loading ? 0 : 1 }}
            onLoadEnd={() => setLoading(false)}
            onMessage={handleMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('Ошибка WebView:', nativeEvent);
              setError('Ошибка загрузки карты');
              setLoading(false);
            }}
          />
          {selectedLocation && !error && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default MapScreen;