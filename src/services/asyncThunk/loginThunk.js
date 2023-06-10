import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../api/profileApi.js';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { updateUserData } from '../helpers/updateUserData.js';
import { setMessage, setErrorMessage } from '../slices/loginSlice.js';

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