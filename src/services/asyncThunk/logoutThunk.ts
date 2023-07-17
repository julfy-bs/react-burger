import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { setMessage } from '../slices/logoutSlice';
import { AppDispatch, RootState } from '../index';
import { LogoutPromise } from '../../types/LogoutPromise';
import { LogoutInput } from '../../types/LogoutInput';
import { resetAllCookie } from '../helpers/resetAllCookie';
import { updateUser } from '../slices/userSlice';

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
      const { dispatch, getState } = thunkAPI;
      const res = await logoutUser({ token });
      dispatch(updateUser({
        isLogin: false,
        isLogout: true,
        token: { accessToken: null, refreshToken: null, expiresAt: null },
        name: '',
        email: ''
      }));
      resetAllCookie();
      const { logout } = getState();
      showNotificationWithTimeout(logout.messageContent, dispatch, setMessage);
      return res;
    } catch (e: unknown) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e as LogoutError);
      return rejectWithValue(hasErrorData);
    }
  }
);