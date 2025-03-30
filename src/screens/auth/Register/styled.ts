import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

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
  checkbox: { 
    width: 24, 
    height: 24, 
    backgroundColor: Colors.background, // Заменяем '#f0f0f0' на Colors.background
    borderRadius: 4, 
    marginRight: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  checkboxActive: { 
    backgroundColor: Colors.primary // Заменяем '#007AFF' на Colors.primary (синий)
  },
  checkmark: { 
    color: Colors.white, // Заменяем 'white' на Colors.white
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  checkboxText: { 
    fontSize: 12, 
    color: Colors.text // Заменяем '#000' на Colors.text (темно-серый)
  },
  error: { 
    color: Colors.error, // Заменяем 'red' на Colors.error (красный)
    fontSize: 12, 
    marginBottom: 8 
  },
});