import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../api/profileApi.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { updateUserData } from '../helpers/updateUserData.js';
import { setMessage, setErrorMessage } from '../slices/registerSlice.js';

export const fetchRegister = createAsyncThunk(
  'profile/fetchRegister',
  ({ name, email, password },
   { rejectWithValue, getState, dispatch }) =>
    registerUser({ name, email, password })
      .then((res) => {
        const { user, accessToken, refreshToken } = res;
        updateUserData({ user, accessToken, refreshToken, dispatch });
      })
      .then(() => {
        const { register } = getState();
        showNotificationWithTimeout(register.messageContent, dispatch, setMessage);
      })
      .catch(e => {
        dispatch(setErrorMessage({
          errorMessage: true
        }));
        setTimeout(() => {
          dispatch(setErrorMessage({
            errorMessage: false
          }));
        }, 4000);
        return rejectWithValue(e);
      })
);