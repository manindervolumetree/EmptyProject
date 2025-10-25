import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@/components/common/Button/CustomButton';
import CustomTextField from '@/components/common/Input/CustomTextField';
import { loginValidationSchema } from '@/utils/validation/loginSchema';
import { loginScreenStyles as styles } from './styles';
import { navigate } from '@/utils/navigation';
import { ScreenNames } from '@/types/enum';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { loginRequest } from '@/store/slices/auth.slice';
import { LoginRequest } from '@/types/request';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '@/components/common/Loading/GradientBackground';
import colors from '@/constants/theme/colors';

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: 'shivam.shukla@volumetree.com',
      password: 'Volumetree@123',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    if (!isValid) {
      return;
    }
    dispatch(loginRequest(data));
  };

  const handleForgotPassword = () => {
    navigate(ScreenNames.ForgotPassword);
  };

  return (
    <>
      <GradientBackground />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 40}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.heading}>Login as a Student</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    title="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email?.message}
                    errorColor={colors.text.inverse}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    title="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    showPasswordToggle={true}
                    error={errors.password?.message}
                    errorColor={colors.text.inverse}
                  />
                )}
              />

              {/* Forgot Password Link */}
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Action Section */}
            <View style={styles.actionSection}>
              <CustomButton
                title="Log In"
                onPress={handleSubmit(onSubmit)}
                variant="secondary"
                loading={loginLoading}
                disabled={loginLoading}
              />
              <TouchableOpacity
                style={styles.createAccountContainer}
                onPress={() => navigate(ScreenNames.Questionnaire)}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>
                  Don't have an account? Signup
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
