import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { updateUserData } from '../helpers/updateUserData';
import { setMessage, setErrorMessage } from '../slices/registerSlice';
import { LoginPromise } from '../../types/LoginPromise';
import { AppDispatch, RootState } from '../index';
import { User } from '../../types/User';

type KnownErrorData = {
  success: boolean;
  message: string;
};

type RegisterError = {
  data: KnownErrorData;
  ok: boolean;
  status: number;
  statusText: string;
  success: boolean;
  url: string;
}

export const fetchRegister = createAsyncThunk<
  LoginPromise,
  User,
  {
    rejectValue: RegisterError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchRegister',
  async (userData,
   thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const { name, email, password } = userData;
      const res = await registerUser({ name, email, password });
      const { user, accessToken, refreshToken } = res;
      updateUserData({ user, accessToken, refreshToken, dispatch });
      const { register } = getState();
      showNotificationWithTimeout(register.messageContent, dispatch, setMessage);
      return res;
    } catch (e) {
      const { dispatch, rejectWithValue } = thunkAPI;
      const hasErrorData = (e as unknown as RegisterError);
      dispatch(setErrorMessage(true));
      setTimeout(() => {
        dispatch(setErrorMessage(false));
      }, 4000);
      return rejectWithValue(hasErrorData);
    }
  }
)
;