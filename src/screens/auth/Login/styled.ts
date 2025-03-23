// src/screens/auth/Login/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: { flex: 1 },
  mainContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 350,
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
  buttonContainer: {
    gap: 8,
    marginTop: 20,
  },
});