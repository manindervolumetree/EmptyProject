import { all } from 'redux-saga/effects';
import { authSaga } from './sagas/auth.saga';
import { profileSaga } from './sagas/profile.saga';
import { uploadSaga } from './sagas/fileUpload.saga';

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), uploadSaga()]);
}
