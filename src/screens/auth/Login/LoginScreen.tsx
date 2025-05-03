// src/screens/LoginScreen/LoginScreen.tsx
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

// Components
import WaveBackground from '@components/UI/WaveBackground';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import TransparentContainer from '@components/Layout/TransparentContainer';

// Hooks
import { useLoginLogic } from '@hooks';

// Types
import { Props } from './types';

// Styles
import { styles } from './styled';

// Constants
import { TEXTS } from '@constants/Texts';

// Constants for keyboard
const KEYBOARD_OFFSET_IOS = 0;
const KEYBOARD_OFFSET_ANDROID = 20;

/**
 * Экран логина, который позволяет пользователю ввести номер телефона и перейти к верификации.
 * @param navigation - Навигация для перехода на другие экраны.
 */
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const {
    phoneNumber,
    setPhoneNumber,
    isPhoneNumberComplete,
    isKeyboardVisible,
    handleContinue,
  } = useLoginLogic({ navigation });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? KEYBOARD_OFFSET_IOS : KEYBOARD_OFFSET_ANDROID
      }
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Background wave animation */}
          <WaveBackground colorScheme="alternate" />

          {/* Header with title and subtitle, hidden when keyboard is visible */}
          {!isKeyboardVisible && (
            <View style={styles.header}>
              <Text style={styles.title}>{TEXTS.WELCOME_TITLE}</Text>
              <Text style={styles.subtitle}>{TEXTS.LOGIN_MESSAGE}</Text>
            </View>
          )}

          {/* Input and button container */}
          <TransparentContainer>
            <Input
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              variant="phone"
              style={styles.input}
            />
            <Button
              title={TEXTS.LOGIN_BUTTON}
              onPress={handleContinue}
              variant="with-icon-right"
              showIcon
              iconName="arrow-forward"
              block={!isPhoneNumberComplete}
            />
            <View style={styles.linksContainer}>
              <Text style={styles.link}>{TEXTS.FORGOT_PASSWORD}</Text>
              <Text style={styles.link}>{TEXTS.SUPPORT}</Text>
            </View>
          </TransparentContainer>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;