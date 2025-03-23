import {  StyleSheet, } from 'react-native';


export const styles = StyleSheet.create({
  background: { flex: 1 },
  mainContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 82,
    justifyContent: 'space-between',
  },
  uploadIcon: { width: 80, height: 80 },
  iconContainer: { marginBottom: 16 },
  contentContainer: { flex: 1, gap: 8 },
  title: { fontSize: 44, marginBottom: 30, textAlign: 'left' },
  selectedImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  buttonContainer: { gap: 8, marginTop: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  checkbox: { width: 24, height: 24, backgroundColor: '#f0f0f0', borderRadius: 4, marginRight: 8, justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: '#007AFF' },
  checkmark: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  checkboxText: { fontSize: 12, color: '#000' },
  error: { color: 'red', fontSize: 12, marginBottom: 8 },
});
