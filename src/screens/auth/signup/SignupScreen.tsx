import React, { useState } from 'react';
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
import { useRoute, RouteProp } from '@react-navigation/native';
import CustomButton from '@/components/common/Button/CustomButton';
import CustomTextField from '@/components/common/Input/CustomTextField';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { signupValidationSchema } from '@/utils/validation/signupSchema';
import { signupScreenStyles } from '@/screens/auth/signup/styles';
import { navigate, goBack, RootStackParamList } from '@/utils/navigation';
import { ScreenNames } from '@/types/enum';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { RegisterRequest } from '@/types/request';
import { registerRequest, googleAuthRequest } from '@/store/slices/auth.slice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme/colors';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

type SignupScreenRouteProp = RouteProp<RootStackParamList, ScreenNames.SignUp>;

const SignupScreen: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRoute<SignupScreenRouteProp>();
  const { registerLoading, googleAuthLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Get questionnaire answers from route params
  const questionnaireAnswers = route.params?.questionnaireAnswers || {};

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupValidationSchema) as any,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!isValid || !termsAccepted) {
      return;
    }

    // Transform form data to RegisterRequest format
    const registerData: RegisterRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userType: 'student', // Default to student as per the screen title
      phoneNumber: data.phoneNumber,
      questions: JSON.stringify(questionnaireAnswers), // Convert questionnaire answers to JSON string
    };

    dispatch(registerRequest(registerData));
  };

  const handleGoogleLogin = () => {
    // For now, we'll use a placeholder token
    // In a real app, you'd get this token from Google Sign-In SDK
    const googleAuthData = {
      token: 'placeholder_google_token',
      userType: 'student',
      questions: JSON.stringify(questionnaireAnswers), // Convert questionnaire answers to JSON string
    };
    dispatch(googleAuthRequest(googleAuthData));
  };

  const handleLogin = () => {
    navigate(ScreenNames.Login);
  };

  const handleBack = () => {
    goBack();
  };

  return (
    <>
      <SafeAreaView
        style={signupScreenStyles.safeAreaContainer}
        edges={['top']}
      />
      <View style={signupScreenStyles.container}>
        <ScreenHeader
          title="Sign Up"
          showBackButton={true}
          onBackPress={handleBack}
        />

        <View style={signupScreenStyles.content}>
          <KeyboardAvoidingView
            style={signupScreenStyles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 40}
          >
            <ScrollView
              style={signupScreenStyles.scrollView}
              contentContainerStyle={signupScreenStyles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* Header Section */}
              <View style={signupScreenStyles.headerSection}>
                <Text style={signupScreenStyles.subtitle}>
                  Signing up is easy! Use Google or continue with email.
                </Text>
              </View>

              {/* Action Section */}
              <View style={signupScreenStyles.actionSection}>
                <CustomButton
                  title="Login with Google"
                  onPress={handleGoogleLogin}
                  variant="primary"
                  disabled={registerLoading || googleAuthLoading}
                  loading={googleAuthLoading}
                />

                <View style={signupScreenStyles.dividerContainer}>
                  <View style={signupScreenStyles.divider} />
                  <Text style={signupScreenStyles.dividerText}>or</Text>
                  <View style={signupScreenStyles.divider} />
                </View>
              </View>

              {/* Form Section */}
              <View style={signupScreenStyles.formSection}>
                <View style={signupScreenStyles.nameRow}>
                  <View style={signupScreenStyles.nameField}>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field: { onChange, value } }) => (
                        <CustomTextField
                          title="First Name"
                          placeholder="Enter first name"
                          value={value}
                          onChangeText={onChange}
                          autoCapitalize="words"
                          error={errors.firstName?.message}
                        />
                      )}
                    />
                  </View>
                  <View style={signupScreenStyles.nameField}>
                    <Controller
                      control={control}
                      name="lastName"
                      render={({ field: { onChange, value } }) => (
                        <CustomTextField
                          title="Last Name"
                          placeholder="Enter last name"
                          value={value}
                          onChangeText={onChange}
                          autoCapitalize="words"
                          error={errors.lastName?.message}
                        />
                      )}
                    />
                  </View>
                </View>

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
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      title="Phone Number"
                      placeholder="Enter your phone number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                      error={errors.phoneNumber?.message}
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
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      title="Confirm Password"
                      placeholder="Confirm your password"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={true}
                      showPasswordToggle={true}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />

                {/* Terms and Conditions */}
                <View style={signupScreenStyles.termsContainer}>
                  <TouchableOpacity
                    style={[
                      signupScreenStyles.checkbox,
                      termsAccepted && signupScreenStyles.checkboxChecked,
                    ]}
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    activeOpacity={0.7}
                  >
                    {termsAccepted && (
                      <Text style={signupScreenStyles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={signupScreenStyles.termsTextContainer}
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    activeOpacity={0.7}
                  >
                    <Text style={signupScreenStyles.termsText}>
                      I agree to the{' '}
                      <Text style={signupScreenStyles.termsLink}>
                        Terms and Conditions
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Section */}
              <View style={signupScreenStyles.actionSection}>
                <CustomButton
                  title="Continue"
                  onPress={handleSubmit(onSubmit as any)}
                  variant="secondary"
                  loading={registerLoading}
                  disabled={registerLoading || !termsAccepted}
                />
                <TouchableOpacity
                  style={signupScreenStyles.loginContainer}
                  onPress={handleLogin}
                  activeOpacity={0.7}
                >
                  <Text style={signupScreenStyles.loginText}>
                    Already have an account? Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
      <SafeAreaView edges={['bottom']} />
    </>
  );
};

export default SignupScreen;
