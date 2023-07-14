import { createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPassword } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { setMessage } from '../slices/passwordSlice';
import { AppDispatch, RootState } from '../index';
import { ForgotPasswordInput } from '../../types/ForgotPasswordInput';
import { ForgotPasswordPromise } from '../../types/ForgotPasswordPromise';

type ForgotPasswordError = {
  message: string;
  [key: string]: unknown;
}

export const fetchForgotPassword = createAsyncThunk<
  ForgotPasswordPromise,
  ForgotPasswordInput,
  {
    rejectValue: ForgotPasswordError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchForgotPassword',
  async ({ email },
         thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const { password } = getState();
      const res = await forgotPassword({ email });
      showNotificationWithTimeout(password.forgotPasswordRequest.messageContent,
        dispatch, setMessage);
      return res;
    } catch (e) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e as unknown as ForgotPasswordError);
      return rejectWithValue(hasErrorData);
    }
  }
);