// src/screens/PasswordScreen/styles.ts
import { StyleSheet } from 'react-native';

// Constants
import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';

// Constants for margins
const HEADER_TOP_MARGIN = 20;
const CONTENT_TOP_MARGIN = 20;
const INPUT_BOTTOM_MARGIN = 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 60, // Extra padding to ensure content is not cut off
  },
  header: {
    marginTop: HEADER_TOP_MARGIN,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 24,
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    marginTop: CONTENT_TOP_MARGIN,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    marginBottom: INPUT_BOTTOM_MARGIN,
  },
});