import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 61,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  textButtonText: {
    color: '#000',
    fontSize: 18,
  },
  iconNoFill: {
    backgroundColor: 'transparent',
  },
  icon: {
    marginLeft: 8,
  },
  iconButtonText: {
    display: 'none',
  },
  primary: {
    backgroundColor: '#1C2526',
  },
  secondary: {
    backgroundColor: '#1C2526',
  },
  text: {
    backgroundColor: '#fff',
  },
  accent: {
    backgroundColor: '#A8BFFA',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  blocked: {
    backgroundColor: '#363636',
  },
  blockedText: {
    color: '#96989F',
    fontSize: 18,
    textAlign: 'center',
  },
  iconVariantSmall: {
    backgroundColor: '#F4A8D6',
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconVariantFull: {
    backgroundColor: '#F4A8D6',
    height: 61,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
