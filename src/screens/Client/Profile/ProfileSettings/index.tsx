import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Screen from '@components/Layout/Screen';
import AvatarPicker from '@components/UI/AvatarPicker';
import SegmentedControl from '@components/UI/SegmentedControl';
import ExperienceControl from '@components/UI/ExperienceControl';
import ClientFilter from '@components/UI/ClientFilter';
import Input from '@components/UI/Input';
import { ProfileSettingsScreenProps, FormState } from './types';
import { styles } from './styled';
import {
  INITIAL_FORM_STATE,
  INPUT_PLACEHOLDERS,
  INPUT_VARIANTS,
} from '@constants/client/profile';
import { createFieldChangeHandler } from '@utils/client/ProfileSettings';

const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = () => {
    const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
    const handleImageChange = createFieldChangeHandler(setFormState, 'selectedImage');
    const handleGenderChange = createFieldChangeHandler(setFormState, 'selectedGender');
    const handleExperienceChange = createFieldChangeHandler(setFormState, 'selectedExperience');
    const handleClientFiltersChange = createFieldChangeHandler(setFormState, 'clientFilters');
    const handleFullNameChange = createFieldChangeHandler(setFormState, 'fullName');
    const handlePhoneNumberChange = createFieldChangeHandler(setFormState, 'phoneNumber');
    const handleEmailChange = createFieldChangeHandler(setFormState, 'email');
    const handleDescriptionChange = createFieldChangeHandler(setFormState, 'description');
  
    return (
      <Screen>
        <View style={styles.componentWrapper}>
          <AvatarPicker selectedImage={formState.selectedImage} onImageChange={handleImageChange} />
        </View>
  
        <View style={styles.componentWrapper}>
          <Text style={styles.label}>Имя и фамилия</Text>
          <Input
            value={formState.fullName}
            onChangeText={handleFullNameChange}
            variant={INPUT_VARIANTS.FULL_NAME}
            placeholder={INPUT_PLACEHOLDERS.FULL_NAME}
          />
        </View>
  
        <View style={styles.componentWrapper}>
          <SegmentedControl
            onChange={handleGenderChange}
            initialValue={formState.selectedGender}
          />
        </View>
  
        <View style={styles.componentWrapper}>
          <Text style={styles.label}>Номер телефона</Text>
          <Input
            value={formState.phoneNumber}
            onChangeText={handlePhoneNumberChange}
            variant={INPUT_VARIANTS.PHONE}
            placeholder={INPUT_PLACEHOLDERS.PHONE_NUMBER}
            keyboardType="phone-pad"
          />
        </View>
  
        <View style={styles.componentWrapper}>
          <Text style={styles.label}>Электронная почта</Text>
          <Input
            value={formState.email}
            onChangeText={handleEmailChange}
            variant={INPUT_VARIANTS.EMAIL}
            placeholder={INPUT_PLACEHOLDERS.EMAIL}
            keyboardType="email-address"
          />
        </View>
  
        <View style={styles.componentWrapper}>
          <ClientFilter
            onChange={handleClientFiltersChange}
            initialValues={formState.clientFilters}
          />
        </View>
  
        <View style={styles.componentWrapper}>
          <ExperienceControl
            onChange={handleExperienceChange}
            initialValue={formState.selectedExperience}
          />
        </View>
  
        <View style={styles.componentWrapperLast}>
          <Text style={styles.label}>Описание</Text>
          <Input
            value={formState.description}
            onChangeText={handleDescriptionChange}
            variant={INPUT_VARIANTS.DESCRIPTION}
            placeholder={INPUT_PLACEHOLDERS.DESCRIPTION}
          />
        </View>
      </Screen>
    );
  };
  
  export default ProfileSettingsScreen;