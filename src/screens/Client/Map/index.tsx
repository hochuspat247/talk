import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Screen from '@components/Layout/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@navigation/ClientNavigator';
import MapWebView from './MapWebView';
import MapButton from './MapButton';
import styles from './styled';
import { Location } from './types';

type NavigationProp = NativeStackNavigationProp<ClientStackParamList, 'MapScreen'>;

const MapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (selectedLocation) {
      navigation.navigate('NewBooking', { result: selectedLocation });
    }
  };

  return (
    <Screen>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <MapWebView
            setSelectedLocation={setSelectedLocation}
            setLoading={setLoading}
            setError={setError}
          />
          {selectedLocation && !error && (
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