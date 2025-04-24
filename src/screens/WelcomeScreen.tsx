import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Button from '@components/UI/Button';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    console.log('[WelcomeScreen] Mounted');
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/welcome-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Добро пожаловать на платформу!</Text>

        <View style={styles.buttons}>
          {/* Черная кнопка */}
          <Button
            title="Продолжить как Мастер"
            onPress={() => navigation.navigate('Master')}
            variant="primary"
          />
<Button
  title="Продолжить"
  onPress={() => {}}
  variant="with-icon-right"
  showIcon
  iconName="arrow-forward"
  block // 👈 всё, она станет неактивной и с нужными цветами
/>
          {/* Черная со стрелкой */}
          <Button
            title="Продолжить как Мастер"
            onPress={() => navigation.navigate('Master')}
            variant="secondary"
            showIcon
            iconName="arrow-forward"
          />

          {/* Белая кнопка */}
          <Button
            title="Сменить аккаунт"
            onPress={() => navigation.navigate('AccountSwitch')}
            variant="text"
            showIcon
            iconName="refresh"
          />

          {/* Светло-синяя */}
          <Button
            title="Да, все верно"
            onPress={() => navigation.navigate('Confirm')}
            variant="accent"
            showIcon
            iconName="checkmark"
          />

          {/* Маленькая розовая иконка */}
          <Button
            title=""
            onPress={() => navigation.navigate('AddItem')}
            variant="icon"
            showIcon
            iconName="add"
          />

          {/* Полноширинная розовая иконка */}
          <Button
  title=""
  onPress={() => navigation.navigate('AddItem')}
  variant="icon"
  showIcon
  iconName="add"
/>

<View style={styles.iconButtons}>
  <Button
    title=""
    onPress={() => navigation.navigate('AddItem')}
    variant="icon"
    showIcon
    iconName="add"
    size="small"
  />
  <Button
    title=""
    onPress={() => navigation.navigate('EditItem')}
    variant="icon"
    showIcon
    iconName="pencil"
    size="small"
  />
  <Button
    title=""
    onPress={() => navigation.navigate('Settings')}
    variant="icon"
    showIcon
    iconName="settings"
    size="small"
  />
</View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    paddingTop: 53,
    paddingBottom: 53,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    gap: 10,
    width: '100%',
    alignItems: 'center',
  },
  iconButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default WelcomeScreen;
