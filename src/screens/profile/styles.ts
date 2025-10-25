import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme/colors';
import { typography } from '@/constants/theme/typography';

export const profileScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    marginTop: 16,
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.h1.fontSize,
    fontFamily: typography.h1.fontFamily,
    color: colors.white,
  },
  userName: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.secondary,
  },
  changePasswordContainer: {
    marginTop: 8,
  },
  changePasswordText: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: typography.bodySmall.fontFamily,
    color: colors.primary,
    textDecorationLine: 'underline' as 'underline',
  },
  infoSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    paddingBottom: 10,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.text.primary,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editIcon: {
    padding: 4,
  },
  infoItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  infoLabel: {
    fontSize: typography.labelMedium.fontSize,
    fontFamily: typography.labelMedium.fontFamily,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },

  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -8,
  },
  interestTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 8,
  },
  interestText: {
    fontSize: typography.labelSmall.fontSize,
    fontFamily: typography.labelSmall.fontFamily,
    color: colors.white,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  budgetItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  budgetLabel: {
    fontSize: typography.labelMedium.fontSize,
    fontFamily: typography.labelMedium.fontFamily,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  addButton: {
    padding: 4,
  },
  qualificationCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  qualificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  qualificationNumber: {
    fontSize: typography.labelLarge.fontSize,
    fontFamily: typography.labelLarge.fontFamily,
    color: colors.text.primary,
    fontWeight: '600',
  },
});
