import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styled';
import { BottomNavigatorProps, RootStackParamList, TabConfig } from './types';
import { TABS, ACTIVE_TAB_COLOR, INACTIVE_TAB_COLOR, ICON_SIZE } from './constants';

/**
 * Компонент нижней навигационной панели с вкладками.
 * Отображает иконки для каждой вкладки и индикатор активной вкладки.
 *
 * @param {BottomNavigatorProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент нижней навигации.
 */
const BottomNavigator: React.FC<BottomNavigatorProps> = ({ activeTab }) => {
  const navigation = useNavigation<RootStackParamList>();

  const handleTabPress = (tab: BottomNavigatorProps['activeTab']) => {
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