import { call, put, takeLatest } from 'redux-saga/effects';
import { Endpoints } from '@/constants/endpoints';
import ToastUtil from '@/utils/toast';
import { goBack, navigate } from '@/utils/navigation';
import { ScreenNames } from '@/types/enum';
import {
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
  setTempToken,
  checkVersionRequest,
  checkVersionFailed,
  checkVersionSuccess,
} from '../slices/auth.slice';
import API from '@/utils/axios';
import {
  ApiResponse,
  CheckVersionResponse,
  LoginResponse,
} from '@/types/response';
import { getProfileSuccess } from '../slices/profile.slice';

function* login(action: ReturnType<typeof loginRequest>) {
  try {
    const response: ApiResponse<LoginResponse> = yield call(
      API.post,
      Endpoints.LOGIN,
      action.payload,
    );
    yield put(loginSuccess(response.data.accessToken));
    yield put(getProfileSuccess(response.data.user));
  } catch (error: any) {
    yield put(loginFailure());
    ToastUtil.error(error.message);
  }
}

function* handleForgotPassword(
  action: ReturnType<typeof forgotPasswordRequest>,
) {
  try {
    const response: ApiResponse<void> = yield call(
      API.post,
      Endpoints.FORGOT_PASSWORD,
      action.payload,
    );
    ToastUtil.success(response.message);
    yield call(goBack);
    yield put(forgotPasswordSuccess());
  } catch (error: any) {
    yield put(forgotPasswordFailure());
    ToastUtil.error(error.message);
  }
}

function* handleChangePassword(
  action: ReturnType<typeof changePasswordRequest>,
) {
  try {
    const { token, ...newData } = action.payload;
    const response: ApiResponse<void> = yield call(
      API.post,
      Endpoints.CHANGE_PASSWORD,
      newData,
    );
    yield put(changePasswordSuccess());
    ToastUtil.success('Password changed successfully!');
    goBack();
  } catch (error: any) {
    yield put(changePasswordFailure());
    ToastUtil.error(error.message);
  }
}

function* register(action: ReturnType<typeof registerRequest>) {
  try {
    const response: ApiResponse<LoginResponse> = yield call(
      API.post,
      Endpoints.REGISTER,
      action.payload,
    );
    yield put(registerSuccess(response.data.accessToken));
    yield put(getProfileSuccess(response.data.user));
    ToastUtil.success('Registration successful!');
  } catch (error: any) {
    yield put(registerFailure());
    ToastUtil.error(error.message);
  }
}

function* handleResetPassword(action: ReturnType<typeof resetPasswordRequest>) {
  try {
    const response: ApiResponse<void> = yield call(
      API.post,
      Endpoints.RESET_PASSWORD,
      action.payload,
    );
    yield put(resetPasswordSuccess());
    ToastUtil.success('Password reset successfully!');
    navigate(ScreenNames.Login);
  } catch (error: any) {
    yield put(resetPasswordFailure());
    ToastUtil.error(error.message);
  }
}

function* handleVerifyEmail(action: ReturnType<typeof verifyEmailRequest>) {
  try {
    const response: ApiResponse<{ message: string }> = yield call(
      API.post,
      Endpoints.VERIFY_EMAIL,
      action.payload,
    );
    yield put(verifyEmailSuccess());
    ToastUtil.success(response.data.message);

    // Navigate to reset password screen if this is from forgot password flow
    if (action.payload.type === 'forgot-password') {
      navigate(ScreenNames.ResetPassword, {
        token: action.payload.token,
        email: action.payload.email,
      });
    }
  } catch (error: any) {
    yield put(verifyEmailFailure());
    ToastUtil.error(error.message);
  }
}

function* handleResendVerification(
  action: ReturnType<typeof resendVerificationRequest>,
) {
  try {
    const response: ApiResponse<{ message: string }> = yield call(
      API.post,
      Endpoints.RESEND_VERIFICATION,
      action.payload,
    );
    yield put(resendVerificationSuccess());
    ToastUtil.success(response.data.message);
  } catch (error: any) {
    yield put(resendVerificationFailure());
    ToastUtil.error(error.message);
  }
}

function* handleGoogleAuth(action: ReturnType<typeof googleAuthRequest>) {
  try {
    const response: ApiResponse<LoginResponse> = yield call(
      API.post,
      Endpoints.GOOGLE_AUTH,
      action.payload,
    );
    yield put(googleAuthSuccess(response.data.accessToken));
    yield put(getProfileSuccess(response.data.user));
    ToastUtil.success('Google authentication successful!');
  } catch (error: any) {
    yield put(googleAuthFailure());
    ToastUtil.error(error.message);
  }
}

function* handleGetGoogleAuthUrl() {
  try {
    const response: ApiResponse<{ url: string }> = yield call(
      API.get,
      Endpoints.GOOGLE_AUTH_URL,
    );
    yield put(getGoogleAuthUrlSuccess());
    // You can handle the URL response here, maybe open it in a browser
    // or return it to the component that called this action
  } catch (error: any) {
    yield put(getGoogleAuthUrlFailure());
    ToastUtil.error(error.message);
  }
}

function* handleCheckVersion(action: ReturnType<typeof checkVersionRequest>) {
  try {
    const response: ApiResponse<CheckVersionResponse> = yield call(
      API.get,
      Endpoints.CHECK_VERSION,
      { params: action.payload },
    );
    yield put(checkVersionSuccess(response.data));
  } catch (error: any) {
    yield put(checkVersionFailed());
    console.error('Version check failed:', error);
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(registerRequest.type, register);
  yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
  yield takeLatest(resetPasswordRequest.type, handleResetPassword);
  yield takeLatest(changePasswordRequest.type, handleChangePassword);
  yield takeLatest(verifyEmailRequest.type, handleVerifyEmail);
  yield takeLatest(resendVerificationRequest.type, handleResendVerification);
  yield takeLatest(googleAuthRequest.type, handleGoogleAuth);
  yield takeLatest(getGoogleAuthUrlRequest.type, handleGetGoogleAuthUrl);
  yield takeLatest(checkVersionRequest.type, handleCheckVersion);
}
