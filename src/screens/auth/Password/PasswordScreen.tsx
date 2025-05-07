
import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


import Input from '@components/UI/Input';


import { usePasswordLogic, useKeyboardVisibility } from '@hooks';


import { Props } from './types';


import { styles } from './styled';



const PasswordScreen: React.FC<Props> = ({ route, onVerificationSuccess }) => {
  const { phone, password, setPassword, hasError, passwordStrength, handlePasswordSubmit } =
    usePasswordLogic({
      route,
      onVerificationSuccess,
    });
  const isKeyboardVisible = useKeyboardVisibility();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {!isKeyboardVisible && (
            <View style={styles.header}>
              <Text style={styles.subtitle}>{phone}</Text>
            </View>
          )}

          <View style={styles.content}>
            <Input
              value={password}
              onChangeText={setPassword}
              variant="password"
              secureTextEntry
              hasError={hasError}
              passwordStrength={passwordStrength}
              style={styles.input}
              onSubmitEditing={handlePasswordSubmit}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PasswordScreen;