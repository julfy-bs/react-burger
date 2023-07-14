import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../api/profileApi';
import { updateUserData } from '../helpers/updateUserData';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
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
      const { dispatch } = thunkAPI
      const res = await logoutUser({ token });
      updateUserData({ dispatch });
      const { logout } = thunkAPI.getState();
      showNotificationWithTimeout(logout.messageContent, thunkAPI.dispatch, setMessage);
      return res;
    } catch (e: unknown) {
      const { rejectWithValue } = thunkAPI
      const hasErrorData = (e as LogoutError);
      return rejectWithValue(hasErrorData);
    }
  }
);