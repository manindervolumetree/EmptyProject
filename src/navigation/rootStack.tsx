import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './stacks/main';
import { NavigationRef } from '@/utils/navigation';
import colors from '@/constants/theme/colors';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background.primary,
  },
};

const RootStack = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={NavigationRef} theme={Theme}>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStack;
