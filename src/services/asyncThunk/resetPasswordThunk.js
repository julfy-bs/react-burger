import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPassword } from '../api/profileApi.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { setMessage } from '../slices/passwordSlice.js';

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
      .catch(e => rejectWithValue(e))
);