import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styled';
import { PeriodSwitchProps, PeriodConfig } from './types';
import { PERIODS } from './constants';

/**
 * Компонент переключателя периодов (Сегодня, Неделя, Месяц).
 * Позволяет пользователю выбирать временной период с визуальным выделением активного состояния.
 *
 * @param {PeriodSwitchProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент переключателя периодов.
 */
const PeriodSwitch: React.FC<PeriodSwitchProps> = ({
  selectedPeriod,
  onPeriodChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {PERIODS.map((period: PeriodConfig) => (
        <TouchableOpacity
          key={period.value}
          style={[
            styles.button,
            selectedPeriod === period.value && styles.selectedButton,
          ]}
          onPress={() => onPeriodChange(period.value)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPeriod === period.value && styles.selectedButtonText,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PeriodSwitch;