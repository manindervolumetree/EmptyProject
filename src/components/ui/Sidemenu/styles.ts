import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const customDrawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 0,
    padding: 0,
  },
  safeArea: {
    backgroundColor: colors.primary,
    flex: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 15,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    marginTop: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.bodyLarge.fontSize,
    fontFamily: typography.bodyLarge.fontFamily,
    color: colors.white,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: typography.bodySmall.fontFamily,
    color: colors.white,
    opacity: 0.8,
  },
  drawerContent: {
    flex: 1,
  },
  drawerContentContainer: {
    paddingTop: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginBottom: 12,
  },
  logoutText: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.primary,
  },
  versionInfo: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: typography.labelSmall.fontSize,
    fontFamily: typography.labelSmall.fontFamily,
    color: colors.text.tertiary,
  },
});
