import * as yup from 'yup';

export const otpVerificationSchema = yup.object().shape({
  otp: yup
    .string()
    .trim()
    .matches(/^\d{6}$/, 'Please enter a valid 6-digit code')
    .required('Verification code is required'),
});
