
import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from './styled';
import { ToggleSwitchProps, TabValue } from './types';
import { TABS_CONFIG } from './variants';
import { Colors } from '@constants/Colors';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  onChange,
  initialValue = 'master',
}) => {
  const [activeTab, setActiveTab] = useState<TabValue>(initialValue);

  const handlePress = (value: TabValue) => {
    setActiveTab(value);
    onChange(value);
  };

  return (
    <View style={styles.container}>
      {Object.values(TABS_CONFIG).map(({ value, label, iconName }) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.tab,
            activeTab === value ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => handlePress(value)}
        >
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color={Colors.white}
            style={styles.icon}
          />
          <Text style={styles.tabText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ToggleSwitch;