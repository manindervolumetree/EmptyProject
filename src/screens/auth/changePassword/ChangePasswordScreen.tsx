import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import ScreenHeader from '@/components/ui/ScreenHeader';
import CustomButton from '@/components/common/Button/CustomButton';
import CustomTextInput from '@/components/common/Input/CustomTextField';
import { changePasswordRequest } from '@/store/slices/auth.slice';
import changePasswordSchema from '@/utils/validation/changePasswordSchema';
import { RootState } from '@/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type ChangePasswordRouteProp = RouteProp<
  { ChangePassword: { from?: string } },
  'ChangePassword'
>;

const ChangePasswordScreen: React.FC = () => {
  const route = useRoute<ChangePasswordRouteProp>();
  const { from } = route.params || {};
  const dispatch = useDispatch();
  const { changePasswordLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    const { currentPassword, newPassword } = data;
    dispatch(
      changePasswordRequest({
        currentPassword,
        newPassword,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Change Password"
        showBackButton={from === 'forceChange'}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {from === 'forceChange'
              ? 'Your password has expired. Please set a new password to continue.'
              : from === 'profile'
              ? 'Update your password to keep your account secure.'
              : 'Please enter your current password and choose a new secure password.'}
          </Text>

          {/* Current Password */}
          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                title="Current Password"
                placeholder="Enter your current password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
                error={errors.currentPassword?.message}
                showPasswordToggle
              />
            )}
          />

          {/* New Password */}
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                title="New Password"
                placeholder="Enter your new password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
                error={errors.newPassword?.message}
                showPasswordToggle
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                title="Confirm New Password"
                placeholder="Confirm your new password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
                error={errors.confirmPassword?.message}
                showPasswordToggle
              />
            )}
          />

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <Text style={styles.requirementText}>
              • At least 8 characters long
            </Text>
            <Text style={styles.requirementText}>
              • Contains uppercase and lowercase letters
            </Text>
            <Text style={styles.requirementText}>
              • Contains at least one number
            </Text>
            <Text style={styles.requirementText}>
              • Contains at least one special character
            </Text>
          </View>

          {/* Submit Button */}
          <CustomButton
            title="Change Password"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            loading={changePasswordLoading}
            disabled={changePasswordLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
