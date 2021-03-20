import {
  GET_TOTAL_NUMBER_OF_USERS_SAGA,
  GET_USERS_SAGA,
  REGISTER_USER_RESET_STATE_SAGA,
  REGISTER_USER_SAGA,
} from '../constants/userConstants';

export const getUsersAction = (sortBy = 'creationDate', page = 1) => {
  return { type: GET_USERS_SAGA, payload: { sortBy, page } };
};
export const registerUserAction = (username, email, age) => {
  return { type: REGISTER_USER_SAGA, payload: { username, email, age } };
};
export const registerUserResetStateAction = () => {
  return { type: REGISTER_USER_RESET_STATE_SAGA };
};

export const getTotalNumberOfUsersAction = () => {
  return { type: GET_TOTAL_NUMBER_OF_USERS_SAGA };
};
