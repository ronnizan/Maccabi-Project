import { all } from 'redux-saga/effects';
import { watchPopUpMessageSaga } from './popupMessageSaga';
import {
  watchGetTotalNumberOfUsersSaga,
  watchGetUsersSaga,
  watchRegisterUserResetSaga,
  watchRegisterUserSaga,
} from './usersSaga';

export default function* rootSaga() {
  yield all([
    watchPopUpMessageSaga(),
    watchGetUsersSaga(),
    watchRegisterUserSaga(),
    watchGetTotalNumberOfUsersSaga(),
    watchRegisterUserResetSaga(),
  ]);
}
