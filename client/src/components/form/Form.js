import React, { useEffect, useState } from 'react';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { popupMessageAction } from '../../redux/actions/popupMessageActions';
import {
  validateUserName,
  validateEmail,
  validateAge,
} from '../../helpers/user-info-validation';
import { useHistory } from 'react-router-dom';
import {
  registerUserAction,
  registerUserResetStateAction,
} from '../../redux/actions/userActions';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading: registerUserLoading, successMessage } = useSelector(
    (state) => state.registerUser
  );
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const isUserNameValid = validateUserName(username);
    if (!isUserNameValid) {
      dispatch(
        popupMessageAction({
          content: 'Please enter a valid username with minimum of 3 characters',
          type: 'error',
        })
      );
      return;
    }
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      dispatch(
        popupMessageAction({
          content: 'Please enter a valid email address',
          type: 'error',
        })
      );
      return;
    }
    const isAgeValid = validateAge(age);
    if (!isAgeValid) {
      dispatch(
        popupMessageAction({
          content: 'Please enter a valid age number (between 0-100)',
          type: 'error',
        })
      );
      return;
    }
    dispatch(registerUserAction(username, email, +age));
  };

  useEffect(() => {
    //If  registering the user on the server side was successful, push to the users page.
    if (successMessage) {
      history.push('/all-users');
      dispatch(registerUserResetStateAction());
    }
  }, [successMessage]);

  return (
    <form onSubmit={onSubmit} className='Form'>
      {/* while the request to the server is on its way, show a loading spinner */}
      {registerUserLoading && <LoadingSpinner />}
      <h1 className='Form__Title'>Sign Up</h1>
      <span className='Form__Span'>*All field are required</span>
      <label className='Form__Label' htmlFor='username'>
        Username:
      </label>
      <input
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className='Form__Input'
        type='text'
      />

      <label className='Form__Label' htmlFor='email'>
        Email:
      </label>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className='Form__Input'
        type='email'
      />

      <label className='Form__Label' htmlFor='age'>
        Age:
      </label>
      <input
        onChange={(e) => {
          setAge(e.target.value);
        }}
        className='Form__Input'
        type='number'
        max={100}
        min={0}
      />
      {/* if the request to the server is on its way disable the button */}
      <button disabled={registerUserLoading} className='Form__Button'>
        Submit
      </button>
    </form>
  );
};

export default Form;
