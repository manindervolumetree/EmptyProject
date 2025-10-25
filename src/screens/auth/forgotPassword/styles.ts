import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const forgotPasswordScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  leftButton: {
    padding: 8,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.text.primary,
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
  actionSection: {
    marginTop: 'auto',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
