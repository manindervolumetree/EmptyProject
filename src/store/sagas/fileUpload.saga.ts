import { call, put, takeLatest } from 'redux-saga/effects';
import { Endpoints } from '@/constants/endpoints';
import ToastUtil from '@/utils/toast';
import {
  fileUploadRequest,
  fileUploadSuccess,
  fileUploadFailure,
} from '../slices/fileUpload';
import API from '@/utils/axios';
import { ApiResponse, FileUploadResponse } from '@/types/response';

function* fileUpload(action: ReturnType<typeof fileUploadRequest>) {
  try {
    const formData = new FormData();
    formData.append('file', action.payload.file);
    formData.append('location', action.payload.location);

    const response: ApiResponse<FileUploadResponse> = yield call(
      API.post,
      Endpoints.FILE_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    yield put(fileUploadSuccess(response.data));
    ToastUtil.success('File uploaded successfully');
  } catch (error: any) {
    yield put(fileUploadFailure());
    ToastUtil.error(error.message);
  }
}

export function* uploadSaga() {
  yield takeLatest(fileUploadRequest.type, fileUpload);
}
