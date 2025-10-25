import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { fontFamily, fontSize } from '@/constants/theme/typography';

export const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: colors.status.success,
    backgroundColor: colors.white,
    height: 'auto',
    paddingVertical: 10,
  },
  errorToast: {
    borderLeftColor: colors.status.error,
    backgroundColor: colors.white,
    height: 'auto',
    paddingVertical: 10,
  },
  infoToast: {
    borderLeftColor: colors.status.info,
    backgroundColor: colors.white,
    height: 'auto',
    paddingVertical: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    height: 'auto',
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: fontSize.sm * 1.4,
    flexWrap: 'wrap',
    textAlign: 'left',
    height: 'auto',
  },
  customToast: {
    height: 60,
    width: '90%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  customToastContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  customTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.inverse,
  },
  customMessage: {
    fontSize: fontSize.sm,
    color: colors.text.inverse,
  },
});
