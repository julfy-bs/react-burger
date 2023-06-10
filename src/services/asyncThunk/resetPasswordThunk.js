import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPassword } from '../api/profileApi.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { setMessage, setErrorMessage } from '../slices/passwordSlice.js';

export const fetchResetPassword = createAsyncThunk(
  'profile/fetchResetPassword',
  ({ password, token },
   { rejectWithValue, getState, dispatch }) =>
    resetPassword({ password, token })
      .then(() => {
        const { password } = getState();
        showNotificationWithTimeout(password.resetPasswordRequest.messageContent,
          dispatch, setMessage);
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