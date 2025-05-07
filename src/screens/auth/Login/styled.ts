
import { StyleSheet } from 'react-native';


import { Colors } from '@constants/Colors';
import { FONTS } from '@constants/Fonts';


const HEADER_TOP_MARGIN = 50;
const INPUT_BOTTOM_MARGIN = 20;
const LINKS_TOP_MARGIN = 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 60, 
  },
  header: {
    marginTop: HEADER_TOP_MARGIN,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.NEXT_ART_BOLD,
    fontSize: 67,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 23,
    color: Colors.text,
    marginTop: 8,
  },
  input: {
    marginBottom: INPUT_BOTTOM_MARGIN,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: LINKS_TOP_MARGIN,
  },
  link: {
    fontFamily: FONTS.MANROPE_SEMI_BOLD,
    fontSize: 14,
    color: Colors.white,
  },
});