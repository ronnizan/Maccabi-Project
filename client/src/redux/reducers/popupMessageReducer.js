import { RESET_MESSAGE, SHOW_MESSAGE } from '../constants/messageConstants';
export const popupMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { message: action.payload };
    case RESET_MESSAGE:
      return { message: null };
    default:
      return state;
  }
};
