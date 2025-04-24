import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ToggleSwitchProps {
  onChange: (value: 'master' | 'client') => void;
  initialValue?: 'master' | 'client';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  onChange,
  initialValue = 'master',
}) => {
  const [activeTab, setActiveTab] = useState<'master' | 'client'>(initialValue);

  const handlePress = (value: 'master' | 'client') => {
    setActiveTab(value);
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'master' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => handlePress('master')}
      >
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.tabText}>Мастер</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'client' ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => handlePress('client')}
      >
        <MaterialCommunityIcons name="crown" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.tabText}>Клиент</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Прозрачный фон
    borderRadius: 20, // Закругление контейнера 20
    padding: 8, // Отступы от краев 8
    gap: 8, // Расстояние между кнопками 8
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14, // Отступы от краев до текста и иконки 14
    borderRadius: 16, // Закругление кнопок 16
  },
  activeTab: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Полупрозрачный фон для активной вкладки
  },
  inactiveTab: {
    backgroundColor: 'transparent', // Прозрачный фон для неактивной вкладки
  },
  tabText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8, // Отступ между иконкой и текстом
  },
});

export default ToggleSwitch;