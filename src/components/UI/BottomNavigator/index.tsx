import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';
import { TabConfig, TabName } from './types';
import { TABS, ACTIVE_TAB_COLOR, INACTIVE_TAB_COLOR, ICON_SIZE } from './constants';


export interface BottomNavigatorProps<T extends object> {
  activeTab: TabName;
}


const BottomNavigator = <T extends object>({ activeTab }: BottomNavigatorProps<T>) => {
  const navigation = useNavigation<any>(); 

  const handleTabPress = (tab: TabName) => {
    navigation.navigate(tab);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab: TabConfig) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => handleTabPress(tab.name)}
        >
          <Ionicons
            name={activeTab === tab.name ? tab.activeIcon : tab.inactiveIcon}
            size={ICON_SIZE}
            color={activeTab === tab.name ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR}
          />
          {activeTab === tab.name && <View style={styles.dot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigator;