import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../api/profileApi.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { updateUserData } from '../helpers/updateUserData.js';
import { setMessage } from '../slices/loginSlice.js';

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  ({ email, password },
   { rejectWithValue, getState, dispatch }) =>
    loginUser({ email, password })
      .then((res) => {
        const { user, accessToken, refreshToken } = res;
        updateUserData({
          user, accessToken, refreshToken, dispatch
        });
      })
      .then(() => {
        const { login } = getState();
        showNotificationWithTimeout(login.messageContent,
          dispatch, setMessage);
      })
      .catch(e => rejectWithValue(e))
);