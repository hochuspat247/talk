import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from './constants';

console.log('[styled.ts] SIZES =', SIZES);
console.log('[styled.ts] COLORS =', COLORS);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    marginTop: SIZES.PADDINGS.MARGINS.MENU_TOP,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.PADDINGS.VERTICAL,
  },
  menuIcon: {
    marginRight: SIZES.PADDINGS.MARGINS.ICON_RIGHT,
  },
  menuText: {
    fontSize: SIZES.FONT_SIZE,
    color: COLORS.TEXT,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: SIZES.PADDINGS.MARGINS.ARROW_LEFT,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.PADDINGS.VERTICAL,
    marginTop: SIZES.PADDINGS.MARGINS.LOGOUT_TOP,
  },
  logoutText: {
    fontSize: SIZES.FONT_SIZE,
    color: COLORS.LOGOUT_TEXT,
    flex: 1,
  },
});
