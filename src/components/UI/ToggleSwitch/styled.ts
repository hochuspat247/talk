// src/components/ToggleSwitch/styled.ts
import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.transparentDark10, // rgba(0, 0, 0, 0.1)
    borderRadius: 20,
    padding: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: Colors.transparentDark30, // rgba(0, 0, 0, 0.3)
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.white, // #FFFFFF
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});