import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styled';

export type PeriodType = 'today' | 'week' | 'month';

interface PeriodSwitchProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  style?: StyleProp<ViewStyle>;
}

const PeriodSwitch: React.FC<PeriodSwitchProps> = ({
  selectedPeriod,
  onPeriodChange,
  style,
}) => {
  const periods: { label: string; value: PeriodType }[] = [
    { label: 'Сегодня', value: 'today' },
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
  ];

  return (
    <View style={[styles.container, style]}>
      {periods.map((period) => (
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