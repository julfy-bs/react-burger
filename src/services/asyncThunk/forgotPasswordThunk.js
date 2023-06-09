import { createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPassword } from '../api/profileApi.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { setMessage } from '../slices/passwordSlice.js';

export const fetchForgotPassword = createAsyncThunk(
  'profile/fetchForgotPassword',
  ({ email },
   { rejectWithValue, getState, dispatch }) =>
    forgotPassword({ email })
      .then(() => {
        const { password } = getState();
        showNotificationWithTimeout(password.forgotPasswordRequest.messageContent,
          dispatch, setMessage);
      })
      .catch(e => rejectWithValue(e))
);