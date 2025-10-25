import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
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
  },
  formSection: {
    marginBottom: 32,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  createAccountContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    fontSize: typography.link.fontSize,
    fontFamily: typography.link.fontFamily,
    color: colors.text.inverse,
  },
  actionSection: {
    marginTop: 'auto',
    paddingTop: 24,
  },
});
