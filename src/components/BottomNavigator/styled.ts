import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white, // Заменяем '#fff' на Colors.white
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.text, // Заменяем '#000' на Colors.text (темно-серый)
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: Colors.text, // Заменяем '#000' на Colors.text (темно-серый)
    marginTop: 4,
  },
  activeTabText: {
    color: Colors.primary, // Заменяем '#007AFF' на Colors.primary (синий)
  },
});