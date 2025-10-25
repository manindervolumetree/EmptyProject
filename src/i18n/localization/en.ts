import { LocalizationType } from '../localization.type';

export const String_EN: LocalizationType = {
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    min: 'Must be at least ${min} characters',
    max: 'Must be at most ${max} characters',
    match: 'Passwords must match',
    phone: 'Phone must be 10 digits',
    capitalLetter: 'Must include at least one capital letter',
    number: 'Must include at least one number',
    specialChar: 'Must include at least one special character',
    passwordMismatch: 'Passwords must match',
  },
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    forgotPassword: 'Forgot Password',
  },

  profile: {
    title: 'Your Profile',
    userName: 'Aria Vance',
    userRole: 'Product Designer',
    userEmail: 'aria.vance@example.com',
    accountSecurity: 'Account & Security',
    password: 'Password',
    submitRecommendation: 'Submit Recommendation',
    recommendation: 'Recommendation',
    recommendationSubtitle: 'Share your feedback and suggestions',
    logout: 'Logout',
  },
};
