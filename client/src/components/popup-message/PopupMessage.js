import React from 'react';
import { useSelector } from 'react-redux';
import './PopupMessage.css';

const PopupMessage = () => {
  const { message } = useSelector((state) => state.popupMessage);

  return (
    <>
      {message && (
        <div
          className={
            message.type === 'error'
              ? 'MessageContainer'
              : 'MessageContainer Success'
          }
        >
          {message.content}
        </div>
      )}
    </>
  );
};

export default PopupMessage;
