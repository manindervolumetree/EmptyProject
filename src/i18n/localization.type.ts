export interface LocalizationType {
  // Validation messages
  validation: {
    required: string;
    email: string;
    min: string;
    max: string;
    match: string;
    phone: string;
    capitalLetter: string;
    number: string;
    specialChar: string;
    passwordMismatch: string;
  };

  // Common UI elements
  common: {
    ok: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    loading: string;
    error: string;
    success: string;
  };

  // Auth related messages
  auth: {
    login: string;
    logout: string;
    register: string;
    forgotPassword: string;
  };

  // Profile related messages
  profile: {
    title: string;
    userName: string;
    userRole: string;
    userEmail: string;
    accountSecurity: string;
    password: string;
    submitRecommendation: string;
    logout: string;
    recommendation: string;
    recommendationSubtitle: string;
  };
}
