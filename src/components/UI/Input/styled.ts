import { StyleSheet } from 'react-native';
import { FONTS } from '@constants/Fonts';
import { Colors } from '@constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    height: 56, // Добавляем фиксированную высоту
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.transparentWhite5,
    borderColor: Colors.gray50Transparent,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 50,
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 18,
    lineHeight: 24,
    textAlignVertical: 'center',
    color: Colors.black,
  },
  timeInput: {
    width: 100,
    height: 48,
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.grayLight,
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
    backgroundColor: Colors.transparentWhite5,
    borderColor: Colors.gray50Transparent,
    borderWidth: 1,
    borderRadius: 16,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
  },
  codeInputError: {
    borderColor: Colors.error,
  },
  codeInputSuccess: {
    borderColor: Colors.successBright,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  successBorder: {
    borderColor: Colors.successBright,
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  subText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.grayMedium,
    marginTop: 5,
    textAlign: 'left',
  },
  subTextHighlighted: {
    color: Colors.orangeHighlight,
  },
  errorText: {
    fontFamily: FONTS.MANROPE_REGULAR,
    fontSize: 12,
    color: Colors.error,
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
  codeInputFocused: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  strengthBarInactive: {
    backgroundColor: Colors.border,
  },
  strengthBarActive: {
    backgroundColor: Colors.black,
  },
  weak: {
    backgroundColor: Colors.errorLight,
  },
  medium: {
    backgroundColor: Colors.warning,
  },
  strong: {
    backgroundColor: Colors.successMedium,
  },
});