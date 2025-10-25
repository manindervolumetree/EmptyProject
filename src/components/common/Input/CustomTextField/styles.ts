import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const customTextFieldStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: typography.labelMedium.fontSize,
    fontFamily: typography.labelMedium.fontFamily,
    color: colors.text.primary,
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    minHeight: 45,
  },
  input: {
    flex: 1,
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.primary,
    paddingVertical: 10,
  },
  passwordToggle: {
    padding: 4,
    marginLeft: 8,
  },
  passwordIcon: {
    width: 20,
    height: 20,
    tintColor: colors.text.tertiary,
  },
  errorText: {
    fontSize: typography.labelSmall.fontSize,
    fontFamily: typography.labelSmall.fontFamily,
    color: colors.status.error,
    marginTop: 4,
  },
});
