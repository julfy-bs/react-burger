import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../api/profileApi';
import { updateUserData } from '../helpers/updateUserData';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { setMessage } from '../slices/logoutSlice';
import { AppDispatch, RootState } from '../index';
import { LogoutPromise } from '../../types/LogoutPromise';
import { LogoutInput } from '../../types/LogoutInput';

type LogoutError = {
  success: boolean;
  message: string;
}

export const fetchLogout = createAsyncThunk<
  LogoutPromise,
  LogoutInput,
  {
    rejectValue: LogoutError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchLogout',
  async ({ token },
         thunkAPI) => {
    try {
      const res = await logoutUser({ token });
      updateUserData({
        dispatch: thunkAPI.dispatch
      });
      const { logout } = thunkAPI.getState();
      showNotificationWithTimeout(logout.messageContent, thunkAPI.dispatch, setMessage);
      return res;
    } catch (e) {
      const hasErrorData = (e as unknown as LogoutError);
      return thunkAPI.rejectWithValue(hasErrorData);
    }
  }
);