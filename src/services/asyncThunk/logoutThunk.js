import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../api/profileApi.js';
import { updateUserData } from '../helpers/updateUserData.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { setMessage } from '../slices/logoutSlice.js';

export const fetchLogout = createAsyncThunk(
  'profile/fetchLogout',
  ({ token }, { rejectWithValue, getState, dispatch }) =>
    logoutUser({ token })
      .then(() => {
        updateUserData({ dispatch });
      })
      .then(() => {
        const { logout } = getState();
        showNotificationWithTimeout(logout.messageContent, dispatch, setMessage);
      })
      .catch(e => rejectWithValue(e))
);
