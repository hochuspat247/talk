import React from 'react';
import { View, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@constants/Colors';
import { styles } from '../styled';

interface BaseInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const BaseInput: React.FC<BaseInputProps> = ({ style, testID, ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.grayLight}
        testID={testID}
        {...rest}
      />
    </View>
  );
};

export default BaseInput;