import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';

interface BottomNavigatorProps {
  activeTab: 'Home' | 'Friends' | 'Wallet' | 'Settings';
}

const BottomNavigator: React.FC<BottomNavigatorProps> = ({ activeTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tab: 'Home' | 'Friends' | 'Wallet' | 'Settings') => {
    if (tab === 'Home') {
      navigation.navigate('Home');
    } else if (tab === 'Friends') {
      navigation.navigate('Friends');
    } else if (tab === 'Wallet') {
      navigation.navigate('Wallet');
    } else if (tab === 'Settings') {
      navigation.navigate('Settings');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Home')}>
        <Ionicons
          name={activeTab === 'Home' ? 'home' : 'home-outline'} // Заполненная иконка для активной вкладки
          size={24}
          color={activeTab === 'Home' ? '#F090F1' : '#000'}
        />
        {activeTab === 'Home' && <View style={styles.dot} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Friends')}>
        <Ionicons
          name={activeTab === 'Friends' ? 'people' : 'people-outline'} // Заполненная иконка для активной вкладки
          size={24}
          color={activeTab === 'Friends' ? '#F090F1' : '#000'}
        />
        {activeTab === 'Friends' && <View style={styles.dot} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Wallet')}>
        <Ionicons
          name={activeTab === 'Wallet' ? 'wallet' : 'wallet-outline'} // Заполненная иконка для активной вкладки
          size={24}
          color={activeTab === 'Wallet' ? '#F090F1' : '#000'}
        />
        {activeTab === 'Wallet' && <View style={styles.dot} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('Settings')}>
        <Ionicons
          name={activeTab === 'Settings' ? 'settings' : 'settings-outline'} // Заполненная иконка для активной вкладки
          size={24}
          color={activeTab === 'Settings' ? '#F090F1' : '#000'}
        />
        {activeTab === 'Settings' && <View style={styles.dot} />}
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigator;