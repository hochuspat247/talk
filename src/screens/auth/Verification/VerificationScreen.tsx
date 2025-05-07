import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '@components/UI/Input';
import { TEXTS } from '@constants/Texts';
import { useVerificationLogic } from '@hooks/auth/useVerificationLogic';
import { styles } from './styled';
import { VerificationScreenProps } from './types';





const VerificationScreen: React.FC<VerificationScreenProps> = ({ navigation, route, onVerificationSuccess }) => {
  const { phone, isRegistered } = route.params;
  const {
    code,
    timer,
    hasError,
    formattedPhone,
    handleCodeChange,
    handleResendCode,
  } = useVerificationLogic({ navigation, phone, isRegistered, onVerificationSuccess });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {TEXTS.VERIFICATION_MESSAGE} {formattedPhone}
        </Text>
        <View style={styles.inputContainer}>
          <Input
            value={code}
            onChangeText={(text) => {
              handleCodeChange(text);
            }}
            variant="code"
            style={styles.input}
            hasError={hasError}
            testID="code-input"
          />
          {hasError && (
            <Text style={styles.errorText}>{TEXTS.INVALID_CODE}</Text>
          )}
        </View>
      </View>

      <Text style={styles.resendText}>
        {TEXTS.RESEND_TEXT} {timer} {TEXTS.RESEND_SECONDS}
      </Text>
      {timer === 0 && (
        <TouchableOpacity onPress={handleResendCode} testID="resend-button">
          <Text style={styles.resendLink}>{TEXTS.RESEND_LINK}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VerificationScreen;