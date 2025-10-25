import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootState } from '@/store/store';
import { resetPasswordRequest } from '@/store/slices/auth.slice';
import { ResetPasswordRequest } from '@/types/request';
import CustomButton from '@/components/common/Button/CustomButton';
import CustomTextField from '@/components/common/Input/CustomTextField';
import ScreenHeader from '@/components/ui/ScreenHeader/ScreenHeader';
import { resetPasswordValidationSchema } from '@/utils/validation/resetPasswordSchema';
import { resetPasswordScreenStyles as styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '@/components/common/Loading/GradientBackground';
import colors from '@/constants/theme/colors';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

type ResetPasswordRouteProp = RouteProp<
  { ResetPassword: { token?: string; email?: string } },
  'ResetPassword'
>;

const ResetPasswordScreen: React.FC = () => {
  const route = useRoute<ResetPasswordRouteProp>();
  const { token, email } = route.params || {};
  const dispatch = useDispatch();
  const { resetPasswordLoading, tempToken } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordValidationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!isValid) {
      return;
    }

    const resetPasswordData: ResetPasswordRequest = {
      token: token || tempToken || '',
      newPassword: data.newPassword,
    };

    dispatch(resetPasswordRequest(resetPasswordData));

    // Reset form on successful submission
    reset();
  };

  return (
    <>
      <GradientBackground />
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Reset Password" />

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 40}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.headerSection}>
                <Text style={styles.title}>Create New Password</Text>
                <Text style={styles.subtitle}>
                  {email && `For ${email}\n`}
                  Enter your new password below. Make sure it's strong and
                  secure.
                </Text>
              </View>

              <View style={styles.formSection}>
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      title="New Password"
                      placeholder="Enter your new password"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={true}
                      showPasswordToggle={true}
                      error={errors.newPassword?.message}
                      errorColor={colors.text.inverse}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      title="Confirm New Password"
                      placeholder="Confirm your new password"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={true}
                      showPasswordToggle={true}
                      error={errors.confirmPassword?.message}
                      errorColor={colors.text.inverse}
                    />
                  )}
                />
              </View>

              <View style={styles.actionSection}>
                <CustomButton
                  title="Reset Password"
                  onPress={handleSubmit(onSubmit)}
                  variant="secondary"
                  loading={resetPasswordLoading}
                  disabled={resetPasswordLoading || !isValid}
                />
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Password Requirements:</Text>
                <Text style={styles.infoText}>
                  • At least 8 characters long
                </Text>
                <Text style={styles.infoText}>
                  • Contains uppercase and lowercase letters
                </Text>
                <Text style={styles.infoText}>
                  • Contains at least one number
                </Text>
                <Text style={styles.infoText}>
                  • Contains at least one special character
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ResetPasswordScreen;
