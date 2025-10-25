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
import { forgotPasswordSchema } from '@/utils/validation/forgotSchema';
import { forgotPasswordScreenStyles as styles } from './styles';
import { goBack } from '@/utils/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest } from '@/store/slices/auth.slice';
import { RootState } from '@/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '@/components/common/Loading/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '@/constants/theme/colors';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { forgotPasswordLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (!isValid) {
      console.log('Form validation failed, preventing submission');
      return;
    }
    dispatch(forgotPasswordRequest(data));
  };

  const handleBackToLogin = () => {
    goBack();
  };

  return (
    <>
      <GradientBackground />

      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.leftButton} onPress={handleBackToLogin}>
          <Icon
            name="chevron-back-outline"
            size={30}
            color={colors.text.inverse}
          />
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 40}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.heading}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your
                password
              </Text>
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
            </View>
            {/* Action Section */}
            <View style={styles.actionSection}>
              <CustomButton
                title="Forgot Password"
                onPress={handleSubmit(onSubmit)}
                variant="secondary"
                loading={forgotPasswordLoading}
                disabled={forgotPasswordLoading}
                style={{ flex: 1 }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ForgotPasswordScreen;
