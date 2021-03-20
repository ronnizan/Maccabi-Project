import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { ServerBaseUrl } from '../constants/endPoint';
import { SHOW_MESSAGE, RESET_MESSAGE } from '../constants/messageConstants';
import {
  GET_TOTAL_NUMBER_OF_USERS_FAIL,
  GET_TOTAL_NUMBER_OF_USERS_REQUEST,
  GET_TOTAL_NUMBER_OF_USERS_SAGA,
  GET_TOTAL_NUMBER_OF_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SAGA,
  GET_USERS_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAIL,
  REGISTER_USER_SAGA,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_RESET_STATE,
  REGISTER_USER_RESET_STATE_SAGA,
} from '../constants/userConstants';
import { waitFiveSecondsBeforeRemovingPopupMessage } from './popupMessageSaga';

export function* registerUserSaga(action) {
  try {
    const { username, email, age } = action.payload;
    yield put({ type: REGISTER_USER_REQUEST });
    const { data } = yield axios.post(`${ServerBaseUrl}/register-user`, {
      username,
      email,
      age,
    });
    if (data.successMessage) {
      yield put({
        type: REGISTER_USER_SUCCESS,
        payload: data.successMessage,
      });
      yield put({
        type: SHOW_MESSAGE,
        payload: { content: data.successMessage, type: 'success' },
      });
      yield waitFiveSecondsBeforeRemovingPopupMessage();
      yield put({ type: RESET_MESSAGE });
    } else {
      //for the purpose of this test im showing a popup message to the user indicating that a user with the same email address already exists in the DB, im aware that for security reasons, its better to display a vague message.
      yield put({ type: REGISTER_USER_FAIL, payload: data.errorMessage });
      yield put({
        type: SHOW_MESSAGE,
        payload: { content: data.errorMessage, type: 'error' },
      });
      yield waitFiveSecondsBeforeRemovingPopupMessage();
      yield put({ type: RESET_MESSAGE });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: REGISTER_USER_FAIL, payload: 'failed to register user' });
    yield put({
      type: SHOW_MESSAGE,
      payload: { content: 'failed to register user', type: 'error' },
    });
    yield waitFiveSecondsBeforeRemovingPopupMessage();
    yield put({ type: RESET_MESSAGE });
  }
}

export function* getTotalNumberOfUsersSaga() {
  try {
    yield put({ type: GET_TOTAL_NUMBER_OF_USERS_REQUEST });
    const { data } = yield axios.get(`${ServerBaseUrl}/get-total-users`);
    yield put({
      type: GET_TOTAL_NUMBER_OF_USERS_SUCCESS,
      payload: data.totalNumberOfUsers,
    });
  } catch (error) {
    yield put({
      type: GET_TOTAL_NUMBER_OF_USERS_FAIL,
      payload: 'failed to get the total number of users',
    });
    yield put({
      type: SHOW_MESSAGE,
      payload: {
        content: 'server error',
        type: 'error',
      },
    });
    yield waitFiveSecondsBeforeRemovingPopupMessage();
    yield put({ type: RESET_MESSAGE });
  }
}

export function* getUsersSaga(action) {
  try {
    const { sortBy, page } = action.payload;
    yield put({ type: GET_USERS_REQUEST });
    const { data } = yield axios.get(
      `${ServerBaseUrl}/get-users?sortBy=${sortBy}&page=${page}`
    );
    if (data.error) {
      yield put({ type: GET_USERS_FAIL, payload: 'failed to get users' });
      yield put({
        type: SHOW_MESSAGE,
        payload: { content: 'failed to get users', type: 'error' },
      });
      yield waitFiveSecondsBeforeRemovingPopupMessage();
      yield put({ type: RESET_MESSAGE });
    } else {
      yield put({ type: GET_USERS_SUCCESS, payload: data.users });
    }
  } catch (error) {
    yield put({ type: GET_USERS_FAIL, payload: 'failed to get users' });
    yield put({
      type: SHOW_MESSAGE,
      payload: { content: 'failed to get users', type: 'error' },
    });
    yield waitFiveSecondsBeforeRemovingPopupMessage();
    yield put({ type: RESET_MESSAGE });
  }
}

export function* resetRegisterUserStateSaga() {
  yield put({ type: REGISTER_USER_RESET_STATE });
}

//watchers
export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS_SAGA, getUsersSaga);
}
export function* watchGetTotalNumberOfUsersSaga() {
  yield takeEvery(GET_TOTAL_NUMBER_OF_USERS_SAGA, getTotalNumberOfUsersSaga);
}
export function* watchRegisterUserSaga() {
  yield takeEvery(REGISTER_USER_SAGA, registerUserSaga);
}
export function* watchRegisterUserResetSaga() {
  yield takeEvery(REGISTER_USER_RESET_STATE_SAGA, resetRegisterUserStateSaga);
}
