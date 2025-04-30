// src/components/Input/styled.ts
import { StyleSheet } from 'react-native';
import { FONTS } from '@constants/Fonts';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.transparentWhite5, // rgba(255,255,255,0.05)
    borderColor: Colors.gray50Transparent, // rgba(153,153,153,0.5)
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 50,
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    color: Colors.black, // #000000
  },
  timeInput: {
    width: 100,
    height: 48,
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.grayLight, // #ccc
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    lineHeight: 48,
    fontFamily: FONTS.MANROPE_REGULAR,
    writingDirection: 'ltr',
  },
  descriptionInput: {
    height: 100,
    fontSize: 14,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  codeInput: {
    width: 56,
    height: 56,
    backgroundColor: Colors.transparentWhite5, // rgba(255,255,255,0.05)
    borderColor: Colors.gray50Transparent, // rgba(153,153,153,0.5)
    borderWidth: 1,
    borderRadius: 16,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black, // #000000
  },
  codeInputError: {
    borderColor: Colors.error, // #B91C1C
  },
  codeInputSuccess: {
    borderColor: Colors.successBright, // #00FF00
  },
  errorBorder: {
    borderColor: Colors.error, // #B91C1C
  },
  successBorder: {
    borderColor: Colors.successBright, // #00FF00
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  subText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.grayMedium, // #999999
    marginTop: 5,
    textAlign: 'left',
  },
  subTextHighlighted: {
    color: Colors.orangeHighlight, // #FF8C00
  },
  errorText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.error, // #B91C1C
    marginTop: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  strengthBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  strengthBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  codeInputFocused: { // Добавляем стиль для активного поля
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  strengthBarInactive: {
    backgroundColor: Colors.border, // #E0E0E0
  },
  strengthBarActive: {
    backgroundColor: Colors.black, // #000000
  },
  weak: {
    backgroundColor: Colors.errorLight, // #ff4d4f
  },
  medium: {
    backgroundColor: Colors.warning, // #faad14
  },
  strong: {
    backgroundColor: Colors.successMedium, // #52c41a
  },
});