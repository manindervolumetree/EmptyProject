/**
 * Typography constants for the application
 */

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  semibold: 'Poppins-SemiBold',
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Typography styles for different text elements
export const typography = {
  h1: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.bold,
  },
  h2: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
  },
  h3: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
  },

  // Body text
  bodyLarge: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.regular,
  },
  bodyMedium: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
  },

  // Labels
  labelLarge: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
  },
  labelMedium: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
  },
  labelSmall: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
  },

  // Buttons
  button: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
  },

  // Links
  link: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
  },
};

export default {
  fontFamily,
  fontSize,
  typography,
};
