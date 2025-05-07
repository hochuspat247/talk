
import { useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface UseNavigationHandlerParams<T> {
  navigation: NativeStackNavigationProp<any>;
  routeName: string;
  params: T;
  condition: boolean;
}










export const useNavigationHandler = <T>({ navigation, routeName, params, condition }: UseNavigationHandlerParams<T>) => {
  return useCallback(() => {
    if (!condition) return;

    try {
      navigation.navigate(routeName, params);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigation, routeName, params, condition]);
};