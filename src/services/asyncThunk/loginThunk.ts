import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../api/profileApi';
import { showNotificationWithTimeout } from '../helpers/showNotificationWithTimeout';
import { setMessage, setErrorMessage } from '../slices/loginSlice';
import { AppDispatch, RootState } from '../index';
import { LoginInput } from '../../types/LoginInput';
import { LoginPromise } from '../../types/LoginPromise';
import { changeUserLoginInfo } from '../helpers/changeUserLoginInfo';

type KnownErrorData = {
  success: boolean;
  message: string;
};

type LoginError = {
  data: KnownErrorData;
  ok: boolean;
  status: number;
  statusText: string;
  success: boolean;
  url: string;
}

export const fetchLogin = createAsyncThunk<
  LoginPromise,
  LoginInput,
  {
    rejectValue: LoginError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchLogin',
  async (userData, thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      const { email, password } = userData;
      const res = await loginUser({ email, password });
      const { user, accessToken, refreshToken } = res;
      changeUserLoginInfo(user, accessToken, refreshToken, dispatch);
      const { login } = getState();
      showNotificationWithTimeout(login.messageContent, dispatch, setMessage);
      return res;
    } catch (e) {
      const { dispatch, rejectWithValue } = thunkAPI;
      const hasErrorData = (e as unknown as LoginError);
      dispatch(setErrorMessage(true));
      setTimeout(() => {
        dispatch(setErrorMessage(false));
      }, 4000);
      return rejectWithValue(hasErrorData);
    }
  }
);