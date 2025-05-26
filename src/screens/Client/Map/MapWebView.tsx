import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { getMapHtml } from './utils';
import { geocodeWithNominatim } from '@constants/geocoding';
import styles from './styled';
import { Location } from './types';

interface MapWebViewProps {
  setSelectedLocation: (location: Location | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const MapWebView: React.FC<MapWebViewProps> = ({
  setSelectedLocation,
  setLoading,
  setError,
}) => {
  const handleMessage = async (event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        const address = await geocodeWithNominatim(data.latitude, data.longitude);
        setSelectedLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          address,
        });
        setError(null);
      }
    } catch (error) {
      console.error('Ошибка при разборе сообщения из WebView:', error);
      setError('Ошибка обработки данных с карты');
    }
  };

  return (
    <>
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
        source={{ html: getMapHtml() }}
        style={{ flex: 1, opacity: loading ? 0 : 1 }}
        onLoadEnd={() => setLoading(false)}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onError={(syntheticEvent) => {
          console.error('Ошибка WebView:', syntheticEvent.nativeEvent);
          setError('Ошибка загрузки карты');
          setLoading(false);
        }}
      />
    </>
  );
};

export default MapWebView;