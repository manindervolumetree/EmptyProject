import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const resetPasswordScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.inverse,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },
  formSection: {
    marginBottom: 32,
  },
  actionSection: {
    marginBottom: 24,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: typography.labelLarge.fontSize,
    fontFamily: typography.labelLarge.fontFamily,
    color: colors.text.inverse,
    marginBottom: 8,
  },
  infoText: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: typography.bodySmall.fontFamily,
    color: colors.text.inverse,
    marginBottom: 4,
    lineHeight: 18,
    opacity: 0.9,
  },
});
