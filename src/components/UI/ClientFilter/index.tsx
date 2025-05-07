import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { ClientFilterProps, FilterState } from './types';
import { styles } from './styled';
import { DEFAULT_FILTERS, FILTER_LABELS, COLORS } from './constants';
import { toggleFilter } from './utils';








const ClientFilter: React.FC<ClientFilterProps> = ({ onChange, initialValues }) => {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialValues,
  });

  const handleToggle = (key: keyof FilterState) => {
    setFilters((prev) => toggleFilter(key, prev, onChange));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Мои клиенты</Text>
      <View style={styles.switchContainer}>
        {(['men', 'women', 'children'] as const).map((key) => (
          <View key={key} style={styles.switchRow}>
            <Text style={[styles.label, filters[key] && styles.labelActive]}>
              {FILTER_LABELS[key]}
            </Text>
            <Switch
              trackColor={{ false: COLORS.TRACK_INACTIVE, true: COLORS.TRACK_ACTIVE }}
              thumbColor={filters[key] ? COLORS.THUMB_ACTIVE : COLORS.THUMB_INACTIVE}
              onValueChange={() => handleToggle(key)}
              value={filters[key]}
              accessibilityLabel={`Переключатель для ${FILTER_LABELS[key]}`}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ClientFilter;