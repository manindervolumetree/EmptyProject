import { call, put, takeLatest } from 'redux-saga/effects';
import { Endpoints } from '@/constants/endpoints';
import ToastUtil from '@/utils/toast';
import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  getCountriesRequest,
  getCountriesSuccess,
  getCountriesFailure,
} from '../slices/profile.slice';
import API from '@/utils/axios';
import { ApiResponse, ProfileResponse } from '@/types/response';

function* getProfile() {
  try {
    const response: ApiResponse<ProfileResponse> = yield call(
      API.get,
      Endpoints.GET_PROFILE,
    );
    yield put(getProfileSuccess(response.data));
  } catch (error: any) {
    yield put(getProfileFailure());
    ToastUtil.error(error.message);
  }
}

function* updateProfile(action: ReturnType<typeof updateProfileRequest>) {
  try {
    const response: ApiResponse<ProfileResponse> = yield call(
      API.put,
      Endpoints.UPDATE_PROFILE,
      action.payload,
    );
    yield put(updateProfileSuccess(response.data));
    ToastUtil.success('Profile updated successfully');
  } catch (error: any) {
    yield put(updateProfileFailure());
    ToastUtil.error(error.message);
  }
}

function* getCountries() {
  try {
    const response: ApiResponse<string[]> = yield call(
      API.get,
      Endpoints.GET_COUNTRIES,
    );
    yield put(getCountriesSuccess(response.data));
  } catch (error: any) {
    yield put(getCountriesFailure());
    ToastUtil.error(error.message);
  }
}

export function* profileSaga() {
  yield takeLatest(getProfileRequest.type, getProfile);
  yield takeLatest(updateProfileRequest.type, updateProfile);
  yield takeLatest(getCountriesRequest.type, getCountries);
}
