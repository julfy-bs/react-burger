import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPassword } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout.js';
import { setMessage, setErrorMessage } from '../slices/passwordSlice';
import { AppDispatch, RootState } from '../index';
import { ResetPasswordInput } from '../../types/ResetPasswordInput';
import { ResetPasswordPromise } from '../../types/ResetPasswordPromise';

type KnownErrorData = {
  success: boolean;
  message: string;
};

type ResetPasswordError = {
  data: KnownErrorData;
  ok: boolean;
  status: number;
  statusText: string;
  success: boolean;
  url: string;
}

export const fetchResetPassword = createAsyncThunk<
  ResetPasswordPromise,
  ResetPasswordInput,
  {
    rejectValue: ResetPasswordError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchResetPassword',
  async (values,
         thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const res = await resetPassword({
        password: values.password,
        token: values.token
      });
      const { password } = getState();
      showNotificationWithTimeout(password.resetPasswordRequest.messageContent,
        dispatch, setMessage);
      return res;
    } catch (e) {
      const { dispatch, rejectWithValue } = thunkAPI;
      const hasErrorData = (e as unknown as ResetPasswordError);
      dispatch(setErrorMessage(true));
      setTimeout(() => {
        dispatch(setErrorMessage(false));
      }, 4000);
      return rejectWithValue(hasErrorData);
    }
  }
);