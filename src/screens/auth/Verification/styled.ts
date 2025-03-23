// src/screens/auth/Verification/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: { flex: 1 },
  mainContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 270,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 44,
    marginBottom: 30,
    textAlign: 'left',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200, // Ширина контейнера для 4 полей
  },
  codeInput: {
    width: 40,
    height: 40,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    gap: 8,
    marginTop: 20,
  },
});