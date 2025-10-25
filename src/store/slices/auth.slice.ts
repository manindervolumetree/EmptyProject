import {
  LoginRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  GoogleAuthRequest,
  CheckVersionRequest,
} from '@/types/request';
import { CheckVersionResponse } from '@/types/response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  tempToken: string | null;
  versionCheckLoading: boolean;
  versionCheckCompleted: boolean;
  versionInfo: CheckVersionResponse | null;
  loginLoading: boolean;
  registerLoading: boolean;
  forgotPasswordLoading: boolean;
  resetPasswordLoading: boolean;
  changePasswordLoading: boolean;
  verifyEmailLoading: boolean;
  resendVerificationLoading: boolean;
  googleAuthLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  tempToken: null,
  versionCheckLoading: false,
  versionCheckCompleted: false,
  versionInfo: null,
  loginLoading: false,
  registerLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  changePasswordLoading: false,
  verifyEmailLoading: false,
  resendVerificationLoading: false,
  googleAuthLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setTempToken: (state: AuthState, action: PayloadAction<string>) => {
      state.tempToken = action.payload;
    },
    logout: (state: AuthState) => {
      state.token = null;
    },
    loginRequest: (state: AuthState, _action: PayloadAction<LoginRequest>) => {
      state.loginLoading = true;
    },
    loginSuccess: (state: AuthState, action: PayloadAction<string>) => {
      state.loginLoading = false;
      state.token = action.payload;
    },
    loginFailure: (state: AuthState) => {
      state.loginLoading = false;
    },
    forgotPasswordRequest: (
      state: AuthState,
      _action: PayloadAction<ForgotPasswordRequest>,
    ) => {
      state.forgotPasswordLoading = true;
    },
    forgotPasswordSuccess: (state: AuthState) => {
      state.forgotPasswordLoading = false;
    },
    forgotPasswordFailure: (state: AuthState) => {
      state.forgotPasswordLoading = false;
    },

    changePasswordRequest: (
      state: AuthState,
      _action: PayloadAction<ChangePasswordRequest>,
    ) => {
      state.changePasswordLoading = true;
    },
    changePasswordSuccess: (state: AuthState) => {
      state.changePasswordLoading = false;
    },
    changePasswordFailure: (state: AuthState) => {
      state.changePasswordLoading = false;
    },

    // Register actions
    registerRequest: (
      state: AuthState,
      _action: PayloadAction<RegisterRequest>,
    ) => {
      state.registerLoading = true;
    },
    registerSuccess: (state: AuthState, action: PayloadAction<string>) => {
      state.registerLoading = false;
      state.token = action.payload;
    },
    registerFailure: (state: AuthState) => {
      state.registerLoading = false;
    },

    // Reset password actions
    resetPasswordRequest: (
      state: AuthState,
      _action: PayloadAction<ResetPasswordRequest>,
    ) => {
      state.resetPasswordLoading = true;
    },
    resetPasswordSuccess: (state: AuthState) => {
      state.resetPasswordLoading = false;
    },
    resetPasswordFailure: (state: AuthState) => {
      state.resetPasswordLoading = false;
    },

    // Verify email actions
    verifyEmailRequest: (
      state: AuthState,
      _action: PayloadAction<VerifyEmailRequest>,
    ) => {
      state.verifyEmailLoading = true;
    },
    verifyEmailSuccess: (state: AuthState) => {
      state.verifyEmailLoading = false;
    },
    verifyEmailFailure: (state: AuthState) => {
      state.verifyEmailLoading = false;
    },

    // Resend verification actions
    resendVerificationRequest: (
      state: AuthState,
      _action: PayloadAction<ResendVerificationRequest>,
    ) => {
      state.resendVerificationLoading = true;
    },
    resendVerificationSuccess: (state: AuthState) => {
      state.resendVerificationLoading = false;
    },
    resendVerificationFailure: (state: AuthState) => {
      state.resendVerificationLoading = false;
    },

    // Google auth actions
    googleAuthRequest: (
      state: AuthState,
      _action: PayloadAction<GoogleAuthRequest>,
    ) => {
      state.googleAuthLoading = true;
    },
    googleAuthSuccess: (state: AuthState, action: PayloadAction<string>) => {
      state.googleAuthLoading = false;
      state.token = action.payload;
    },
    googleAuthFailure: (state: AuthState) => {
      state.googleAuthLoading = false;
    },

    // Google auth URL actions
    getGoogleAuthUrlRequest: (state: AuthState) => {
      state.googleAuthLoading = true;
    },
    getGoogleAuthUrlSuccess: (state: AuthState) => {
      state.googleAuthLoading = false;
    },
    getGoogleAuthUrlFailure: (state: AuthState) => {
      state.googleAuthLoading = false;
    },

    checkVersionRequest: (
      state: AuthState,
      _action: PayloadAction<CheckVersionRequest>,
    ) => {
      state.versionCheckLoading = true;
      state.versionCheckCompleted = false;
    },
    checkVersionSuccess: (
      state: AuthState,
      action: PayloadAction<CheckVersionResponse>,
    ) => {
      state.versionCheckLoading = false;
      state.versionCheckCompleted = true;
      state.versionInfo = action.payload;
    },
    checkVersionFailed: (state: AuthState) => {
      state.versionCheckLoading = false;
      state.versionCheckCompleted = true;
      state.versionInfo = { isCritical: false, isNormalUpdate: false };
    },
    clearVersionInfo: (state: AuthState) => {
      state.versionInfo = null;
    },
  },
});

export const {
  setUserToken,
  setTempToken,
  logout,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  resendVerificationRequest,
  resendVerificationSuccess,
  resendVerificationFailure,
  googleAuthRequest,
  googleAuthSuccess,
  googleAuthFailure,
  getGoogleAuthUrlRequest,
  getGoogleAuthUrlSuccess,
  getGoogleAuthUrlFailure,
  checkVersionRequest,
  checkVersionSuccess,
  checkVersionFailed,
  clearVersionInfo,
} = authSlice.actions;
export default authSlice.reducer;
