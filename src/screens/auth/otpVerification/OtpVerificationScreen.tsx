import React, { useState, useEffect } from 'react';
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
import { otpVerificationSchema } from '@/utils/validation/otpSchema';
import { otpVerificationScreenStyles as styles } from './styles';
import { goBack } from '@/utils/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  verifyEmailRequest,
  resendVerificationRequest,
} from '@/store/slices/auth.slice';
import { RootState } from '@/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '@/components/common/Loading/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '@/constants/theme/colors';

interface OtpVerificationFormData {
  otp: string;
}

interface OtpVerificationScreenProps {
  route?: {
    params?: {
      email?: string;
      type?: 'forgot-password' | 'signup';
    };
  };
}

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  route,
}) => {
  const dispatch = useDispatch();
  const { verifyEmailLoading, resendVerificationLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const email = route?.params?.email || '';
  const verificationType = route?.params?.type || 'forgot-password';

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OtpVerificationFormData>({
    resolver: yupResolver(otpVerificationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    // Start timer when component mounts
    startResendTimer();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const startResendTimer = () => {
    setResendTimer(30);
    setCanResend(false);
  };

  const onSubmit = async (data: OtpVerificationFormData) => {
    if (!isValid) {
      console.log('Form validation failed, preventing submission');
      return;
    }
    dispatch(
      verifyEmailRequest({
        token: data.otp, // Using token field for OTP
        email,
        type: verificationType,
      }),
    );
  };

  const handleResendOtp = () => {
    if (canResend) {
      dispatch(resendVerificationRequest({ email, type: verificationType }));
      startResendTimer();
    }
  };

  const handleBack = () => {
    goBack();
  };

  const getHeaderText = () => {
    switch (verificationType) {
      case 'signup':
        return {
          title: 'Verify Your Account',
          subtitle: `We've sent a verification code to ${email}. Please enter the code to complete your registration.`,
        };
      case 'forgot-password':
      default:
        return {
          title: 'Verify OTP',
          subtitle: `We've sent a verification code to ${email}. Please enter the code to reset your password.`,
        };
    }
  };

  const headerText = getHeaderText();

  return (
    <>
      <GradientBackground />

      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.leftButton} onPress={handleBack}>
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
              <Text style={styles.heading}>{headerText.title}</Text>
              <Text style={styles.subtitle}>{headerText.subtitle}</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="otp"
                render={({ field: { onChange, value } }) => (
                  <CustomTextField
                    title="Verification Code"
                    placeholder="Enter 6-digit code"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    maxLength={6}
                    error={errors.otp?.message}
                    errorColor={colors.text.inverse}
                  />
                )}
              />
            </View>

            {/* Resend Section */}
            <View style={styles.resendSection}>
              <Text style={styles.resendText}>Didn't receive the code? </Text>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={!canResend || resendVerificationLoading}
                style={styles.resendButton}
              >
                <Text
                  style={[
                    styles.resendButtonText,
                    (!canResend || resendVerificationLoading) &&
                      styles.resendButtonTextDisabled,
                  ]}
                >
                  {resendVerificationLoading
                    ? 'Sending...'
                    : canResend
                    ? 'Resend OTP'
                    : `Resend in ${resendTimer}s`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Action Section */}
            <View style={styles.actionSection}>
              <CustomButton
                title="Verify Code"
                onPress={handleSubmit(onSubmit)}
                variant="secondary"
                loading={verifyEmailLoading}
                disabled={verifyEmailLoading}
                style={{ flex: 1 }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default OtpVerificationScreen;
