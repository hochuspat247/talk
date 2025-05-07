
import { TabValue } from './types';

type IconName = 'emoticon-happy-outline' | 'crown';

interface TabConfig {
  value: TabValue;
  label: string;
  iconName: IconName;
}

export const TABS_CONFIG: Record<TabValue, TabConfig> = {
  master: {
    value: 'master',
    label: 'Мастер',
    iconName: 'emoticon-happy-outline',
  },
  client: {
    value: 'client',
    label: 'Клиент',
    iconName: 'crown',
  },
};