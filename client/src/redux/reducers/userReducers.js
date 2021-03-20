import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  GET_TOTAL_NUMBER_OF_USERS_FAIL,
  GET_TOTAL_NUMBER_OF_USERS_SUCCESS,
  GET_TOTAL_NUMBER_OF_USERS_REQUEST,
  REGISTER_USER_RESET_STATE,
} from '../constants/userConstants';

export const getUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, successMessage: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_USER_RESET_STATE:
      return {};
    default:
      return state;
  }
};
export const getTotalUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTAL_NUMBER_OF_USERS_REQUEST:
      return { loading: true };
    case GET_TOTAL_NUMBER_OF_USERS_SUCCESS:
      return { loading: false, totalNumberOfUsers: action.payload };
    case GET_TOTAL_NUMBER_OF_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
