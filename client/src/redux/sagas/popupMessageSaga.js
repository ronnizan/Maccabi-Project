import { put, takeEvery } from 'redux-saga/effects';
import {
  SHOW_MESSAGE,
  RESET_MESSAGE,
  SHOW_MESSAGE_SAGA,
} from '../constants/messageConstants';

export const waitFiveSecondsBeforeRemovingPopupMessage = () =>
  new Promise((resolve) => setTimeout(resolve, 5000));

export function* popUpMessageSaga(action) {
  const { type, content } = action.payload;
  yield put({ type: SHOW_MESSAGE, payload: { content, type } });
  yield waitFiveSecondsBeforeRemovingPopupMessage();
  yield put({ type: RESET_MESSAGE });
}
export function* watchPopUpMessageSaga() {
  yield takeEvery(SHOW_MESSAGE_SAGA, popUpMessageSaga);
}
