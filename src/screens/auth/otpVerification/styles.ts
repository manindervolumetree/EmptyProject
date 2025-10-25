import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const otpVerificationScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  leftButton: {
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerSection: {
    marginBottom: 40,
  },
  heading: {
    fontSize: typography.h1.fontSize,
    fontFamily: typography.h1.fontFamily,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.inverse,
    lineHeight: 22,
  },
  formSection: {
    marginBottom: 32,
  },
  resendSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.inverse,
  },
  resendButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resendButtonText: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.inverse,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: colors.text.secondary,
    textDecorationLine: 'none',
  },
  actionSection: {
    marginTop: 'auto',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
