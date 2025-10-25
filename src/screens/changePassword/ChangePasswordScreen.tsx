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
import { RootState } from '@/store/store';
import { changePasswordRequest } from '@/store/slices/auth.slice';
import { ChangePasswordRequest } from '@/types/request';
import CustomButton from '@/components/common/Button/CustomButton';
import CustomTextField from '@/components/common/Input/CustomTextField';
import ScreenHeader from '@/components/ui/ScreenHeader/ScreenHeader';
import { changePasswordValidationSchema } from '@/utils/validation/changePasswordSchema';
import { changePasswordScreenStyles as styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from '@/utils/navigation';

interface ChangePasswordFormData extends ChangePasswordRequest {
  confirmPassword: string;
}

const ChangePasswordScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { changePasswordLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordValidationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!isValid) {
      return;
    }

    const changePasswordData: ChangePasswordRequest = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    dispatch(changePasswordRequest(changePasswordData));

    // Reset form on successful submission
    reset();
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top']} />
      <View style={styles.container}>
        <ScreenHeader
          title="Change Password"
          showBackButton
          onBackPress={goBack}
        />

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
                <Text style={styles.title}>Change Your Password</Text>
                <Text style={styles.subtitle}>
                  Enter your current password and choose a new secure password
                </Text>
              </View>

              <View style={styles.formSection}>
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      title="Current Password"
                      placeholder="Enter your current password"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={true}
                      showPasswordToggle={true}
                      error={errors.currentPassword?.message}
                    />
                  )}
                />

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
                    />
                  )}
                />
              </View>

              <View style={styles.actionSection}>
                <CustomButton
                  title="Change Password"
                  onPress={handleSubmit(onSubmit)}
                  loading={changePasswordLoading}
                  disabled={changePasswordLoading || !isValid}
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
      </View>
      <SafeAreaView edges={['bottom']} />
    </>
  );
};

export default ChangePasswordScreen;
