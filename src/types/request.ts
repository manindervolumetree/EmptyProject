export interface LoginRequest {
  email: string;
  password: string;
}

export interface CheckVersionRequest {
  version: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  token?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  phoneNumber: string;
  profilePicture?: string;
  questions: string; // JSON string of questionnaire answers
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
  email?: string;
  type?: 'forgot-password' | 'signup';
}

export interface ResendVerificationRequest {
  email: string;
  type?: 'forgot-password' | 'signup';
}

export interface GoogleAuthRequest {
  token: string;
  userType: string;
  questions?: string; // JSON string of questionnaire answers
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone_number?: string;
  dob?: string;
  gender?: string;
  country?: string;
  city?: string;
  address?: string;
  nationality?: string;
  interests?: string[];
  profile_image?: string;
}

export interface FileUploadRequest {
  file: any; // File object
  location: string;
}
