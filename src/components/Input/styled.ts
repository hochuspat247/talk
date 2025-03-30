import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/Colors';

const { width } = Dimensions.get('window');
const codeSize = (width - 80 - 19 * 3) / 4;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.background,
    borderRadius: 59,
    paddingHorizontal: 20,
    fontSize: 14,
    color: Colors.text,
  },
  whiteBackground: {
    backgroundColor: '#fff', // Белый фон для полей
  },
  inputsCode: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 19,
  },
  code: {
    width: codeSize,
    height: codeSize + 10,
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.secondary, // Серая обводка по умолчанию
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  codeFocused: {
    borderColor: Colors.primary, // Синяя обводка при фокусе
  },
  codeSuccess: {
    borderColor: Colors.primary, // Синяя обводка при успехе
  },
  codeError: {
    borderColor: 'red', // Красная обводка при ошибке
  },
  codeText: {
    fontSize: 20,
    color: Colors.text,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputWithIcon: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.background,
    borderRadius: 59,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 14,
    color: Colors.text,
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  checkIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }], // Центрируем по вертикали
    padding: 5,
  },
});