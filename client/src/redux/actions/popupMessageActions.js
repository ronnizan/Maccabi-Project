import { SHOW_MESSAGE_SAGA } from '../constants/messageConstants.js';
export const popupMessageAction = ({ content, type }) => {
  return { type: SHOW_MESSAGE_SAGA, payload: { content, type } };
};
