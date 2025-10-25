import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import DrawerStack from './drawer';
import { RootState } from '@/store/store';
import { ScreenNames } from '@/types/enum';
import LoginScreen from '@/screens/auth/login';
import ForgotPasswordScreen from '@/screens/auth/forgotPassword';
import OtpVerificationScreen from '@/screens/auth/otpVerification';
import AuthChangePasswordScreen from '@/screens/auth/changePassword';
import ResetPasswordScreen from '@/screens/auth/resetPassword';
import ChangePasswordScreen from '@/screens/changePassword';
import SignupScreen from '@/screens/auth/signup';
import CountrySelectionScreen from '@/screens/countrySelection';
import VersionCheckScreen from '@/screens/versionCheck';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.auth?.token);

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={ScreenNames.VersionCheck}
      >
        <Stack.Screen
          name={ScreenNames.VersionCheck}
          component={VersionCheckScreen}
        />
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name={ScreenNames.DrawerStack}
              component={DrawerStack}
            />

            <Stack.Screen
              name={ScreenNames.ProfileChangePassword}
              component={ChangePasswordScreen}
            />

            <Stack.Screen
              name={ScreenNames.CountrySelectionScreen}
              component={CountrySelectionScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
            <Stack.Screen name={ScreenNames.SignUp} component={SignupScreen} />
            <Stack.Screen
              name={ScreenNames.ForgotPassword}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name={ScreenNames.OtpVerification}
              component={OtpVerificationScreen}
            />
            <Stack.Screen
              name={ScreenNames.ResetPassword}
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name={ScreenNames.ChangePassword}
              component={AuthChangePasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
